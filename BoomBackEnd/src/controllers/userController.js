const axios = require('axios');
const {ObjectId} = require('mongodb');
const {User} = require('../utils/db_manager/user_manager');

class userController {

  // Add new user to database
  static async postUser(req, res) {
    const [bear, credentials] = req.headers.authorization.split(' ');
    const response = await axios.get('https://taiwotriumphant.eu.auth0.com/userinfo', {
      headers: {
        authorization: `Bearer ${credentials}`
      }
    })
    const find_user = await User.findUser({email: response.data.email});
    if(find_user === null || find_user === undefined) {
      const result = await User.insertUser(response.data);
      const user = await User.findUser({_id: new ObjectId(result.insertedId)})
      res.status(201).json(user);
    }
    return res.status(400).json({'error': 'User already exists'});
  }

  // get all user in a database
  static async getUsers(req, res) {
    const find_users = await User.findUsers({});
    if(find_users === null || find_users === undefined) {
      return res.status(400).json({'error': 'No User Exists'});
    }
    res.status(201).json(find_users);
  }

  // get a user in the database based on id
  static async getUser(req, res) {
    const find_user = await User.findUser({_id: new ObjectId(req.params.id)});
    if(find_user === null || find_user === undefined) {
      return res.status(400).json({'error': 'User not found'});
    }
    res.status(201).json(find_user);
  }

  // update the user in the db base on id
  static async updateUser(req, res) {
    const body = req.body;
    const user = await User.findUser({_id: new ObjectId(req.params.id)});
    if(user === null || user === undefined) {
      return res.status(400).json({'error': 'User not found'});
    }
    const prevUser = await User.updateUser(user, body);
    const newUser = await User.findUser({_id: new ObjectId(req.params.id)});
    res.status(201).json({'prev': prevUser, 'current': newUser});
  }

  // delete the user from db based on id
  static async deleteUser(req, res) {
    const user = await User.findUser({_id: new ObjectId(req.params.id)});
    if(user === null || user === undefined) {
      return res.status(400).json({'error': 'User not found'});
    }
    await User.deleteUser({_id: new ObjectId(req.params.id)});
    res.staus(200).json({'message': 'User deleted', user: user});
  }

}

module.exports = {userController};