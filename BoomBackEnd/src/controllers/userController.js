const axios = require('axios');
const {ObjectId} = require('mongodb');
const {User} = require('../utils/db_manager/user_manager');
const {Song} = require('../utils/db_manager/song_manager');
const { dbClient } = require('../utils/db');

// find user by Id
async function findUserById(userId) {
  return await User.findUser({ _id: new ObjectId(userId) });
}

// find song by Id
async function findSongById(songId) {
  return await Song.findSong({ _id: new ObjectId(songId) });
}

// update user Liked Songs
async function updateUserLikedSongs(user, songId) {
  if (user.hasOwnProperty('liked') && user.liked.length > 0) {
    return await dbClient.db.collection('users').findOneAndUpdate(
      { _id: user._id },
      { $addToSet: { liked: songId } },
      { returnNewDocument: true }
    );
  } else {
    return await dbClient.db.collection('users').findOneAndUpdate(
      { _id: user._id },
      { $set: { liked: [songId] } },
      { returnNewDocument: true }
    );
  }
}

// get liked songs by a user
async function getUserLikedSongs(userId) {
  const user = await findUserById(userId);
  if (user === null || user === undefined) {
    throw new Error('User not found');
  }
  return user.liked || [];
}

class userController {

  // Add new user to database
  static async postUser(req, res) {
    try {
      const [bear, credentials] = req.headers.authorization.split(' ');
      const response = await axios.get('https://taiwotriumphant.eu.auth0.com/userinfo', {
        headers: {
          authorization: `Bearer ${credentials}`
        }
      })
      const find_user = await User.findUser({email: response.data.email});
      if (!find_user) {
        const result = await User.insertUser(response.data);
        const user = await findUserById(result.insertedId);
        return res.status(201).json({user});
      }
      return res.status(200).json({user: find_user});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  // get all user in a database
  static async getUsers(req, res) {
    try {
      const find_users = await User.findUsers({});
      if (!find_users) {
        return res.status(400).json({'error': 'No User Exists'});
      }
      res.status(200).json(find_users);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  // get a user in the database based on id
  static async getUser(req, res) {
    try {
      const find_user = await findUserById(req.params.id);
      if (!find_user) {
        console.log(find_user);
        return res.status(404).json({'error': 'User not found'});
      }
      res.status(201).json(find_user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  // update the user in the db base on id
  static async updateUser(req, res) {
    try {
      const body = req.body;
      const user = await findUserById(req.params.id);
      if (!user) {
        return res.status(404).json({'error': 'User not found'});
      }
      const prevUser = await User.updateUser(user, body);
      const newUser = await findSongById(req.params.id);
      res.status(200).json({'prev': prevUser, 'current': newUser});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  // delete the user from db based on id
  static async deleteUser(req, res) {
    try{
      const user = await findUserById(req.params.id);
      if (!user) {
        return res.status(404).json({'error': 'User not found'});
      }
      await User.deleteUser({_id: new ObjectId(req.params.id)});
      res.status(201).json({'message': 'User deleted', user: user});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async likeSong(req, res) {
    try {
      const userId = req.params.id;
      const songId = req.params.songId;

      const user = await findUserById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const song = await findSongById(songId);
      if (!song) {
        return res.status(404).json({ error: 'Song not found' });
      }

      await updateUserLikedSongs(user, songId);
      const likedSongs = await getUserLikedSongs(userId);

      return res.status(201).json({ likedSongs });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async unlikeSong() {
    try{
      const userId = req.params.id;
      const songId = req.params.songId;

      const user = await findUserById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const song = await findSongById(songId);
      if (!song) {
        return res.status(404).json({ error: 'Song not found' });
      }

      await dbClient.db.collection('users').findOneAndUpdate(
      { _id: user._id },
      { $pull: { liked: songId } });

      const likedSongs = await getUserLikedSongs(userId);
      return res.status(201).json({ likedSongs });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = {userController, findUserById, findSongById};