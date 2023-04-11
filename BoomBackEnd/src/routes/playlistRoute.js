const express = require('express');
const {playlistController} = require('../controllers/playlistController')
const { validateAccessToken } = require('../middleware/auth0.middleware');
// create a user router for all user routes
const playlistRouter = express.Router();

playlistRouter.post('/', validateAccessToken, playlistController.addPlaylist);
playlistRouter.get('/', validateAccessToken, playlistController.getPlaylists);
playlistRouter.get('/:playId', validateAccessToken, playlistController.getPlaylist);
playlistRouter.put('/:playId', validateAccessToken, playlistController.updatePlaylist);
playlistRouter.delete('/:playId', validateAccessToken, playlistController.updatePlaylist);
playlistRouter.post('/:playId/:songId', validateAccessToken, playlistController.addSongToPlaylist);
playlistRouter.delete('/:playId/:songId', validateAccessToken, playlistController.removeSongFromPlaylist);

module.exports = {playlistRouter};