const {User} = require('../utils/db_manager/user_manager');
const {Song} = require('../utils/db_manager/song_manager');
const {Playlist} = require('../utils/db_manager/playlist_manager');
const {dbClient} = require('../utils/db');
const axios = require('axios');
const {ObjectId} = require('mongodb');
const {findUserById} = require('./userController')

class playlistController {
  
  static async addPlaylist(req, res) {
    try{
      const body = req.body;
      const userId = req.params.id;
      const existedPlaylist = Playlist.findPlaylist({userId, name: body.name});
      if (existedPlaylist) {
        return res.status(400).json({error: 'Playlist already existed'});
      }
      const playlist = {
        name: body.name,
        userId,
        created: new Date().toLocaleString(),
        updated: new Date().toLocaleString(),
      }
      const {insertedId} = await Playlist.insertPlaylist(playlist);
      res.status(201).json({playlist: await Playlist.findPlaylist({_id: new ObjectId(insertedId)})});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }



  static async addSongToPlaylist(req, res) {
    try{
      const userId = req.params.id;
      const playlistId = req.params.playId;
      const songId = req.params.songId;
      const playlist = await Playlist.findPlaylist({_id: new ObjectId(playlistId)});
      if (!playlist) {
        return res.status(404).json({'error': 'Playlist not Found'})
      }
      if (!playlist.hasOwnProperty('songs')) {
        await dbClient.db.collection('playlist').findOneAndUpdate(
          {_id: playlist._id},
          {$set: {songs: [songId]}},
          {returnDocument: true}
        )
      }
      await dbClient.db.collection('playlist').findOneAndUpdat(
        {_id: playlist._id},
        {$addToSet: {songs: songId}},
        {returnDocument: true}
      )

      const newPlaylist = await Playlist.findPlaylist({_id: new ObjectId(playlistId)});
      res.status(201).json({playlist: newPlaylist});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  static async getPlaylist() {
    try {
      const userId = req.params.id;
      const playlistId = req.params.playId;
      const playlist = await Playlist.findPlaylist({_id: new ObjectId(playlistId)});
      if (!playlist) {
        return res.status(404).json({'error': 'Playlist not Found'})
      }
      res.status(200).json({playlist});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getPlaylists() {
    try {
      const userId = req.params.id;
      const playlists = await Playlist.findPlaylists({userId: userId});
      if (!playlists) {
        return res.status(404).json({'error': 'Playlists not Found'})
      }
      res.status(200).json({playlists});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async removeSongFromPlaylist(req, res) {
    try{
      const userId = req.params.id;
      const playlistId = req.params.playId;
      const songId = req.params.songId;
      const playlist = await Playlist.findPlaylist({_id: new ObjectId(playlistId)});
      if (!playlist) {
        return res.status(404).json({'error': 'Playlist not Found'})
      }
      if (!playlist.hasOwnProperty('songs')) {
        return res.status(404).json({'error': 'There is no Playlist'})
      }
      if(userId != playlist.userId) {
        res.status(401).json({'error': 'Unathourized'});
      }
      await dbClient.db.collection('playlist').findOneAndUpdat(
        {_id: playlist._id},
        {$pull: {songs: songId}},
        {returnDocument: true}
      )

      const newPlaylist = await Playlist.findPlaylist({_id: new ObjectId(playlistId)});
      res.status(201).json({playlist: newPlaylist});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async updatePlaylist() {
    try{
      const userId = req.params.id;
      const playlistId = req.params.playId;
      const playlist = await Playlist.findPlaylist({_id: new ObjectId(playlistId)});
      if (!playlist) {
        return res.status(404).json({'error': 'Playlist not Found'})
      }
      if(userId != playlist.userId) {
        res.status(401).json({'error': 'Unathourized'});
      }
      const value = Playlist.updatePlaylist(playlist, {
        name: req.bosy.name,
        updated: new Date().toLocaleString()
      });
      const newPlaylist = await Playlist.findPlaylist({_id: new ObjectId(playlistId)});
      res.status(201).json({playlist: newPlaylist});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async deletePlaylist() {
    try{
      const userId = req.params.id;
      const playlistId = req.params.playId;
      const playlist = await Playlist.findPlaylist({_id: new ObjectId(playlistId)});
      if (!playlist) {
        return res.status(404).json({'error': 'Playlist not Found'})
      }
      if(userId != playlist.userId) {
        res.status(401).json({'error': 'Unathourized'});
      }
      await Playlist.deletePlaylist({_id: new ObjectId(playlistId)})
      res.status(200).json({message: 'Playlist Deleted', playlist})
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = {playlistController};