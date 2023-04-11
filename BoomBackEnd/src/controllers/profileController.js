const {User} = require('../utils/db_manager/user_manager');
const {Song} = require('../utils/db_manager/song_manager');
const {dbClient} = require('../utils/db');
const axios = require('axios');
const {ObjectId} = require('mongodb');
const {findUserById} = require('./userController')

class profileController {
  
    //  get profile
  static async getProfile(req, res) {

    try{
      const userId = req.params.id;
      const user = await findUserById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({user});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getSongsUploadedByUser() {

    try{
      const userId = req.params.id;
      const user = await findUserById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const songs = await Song.findSongs({userId: user._id});
      res.status(200).json({songs})

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = {profileController};