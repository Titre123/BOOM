const express = require('express');
const {songController} = require('../controllers/songController');
const { validateAccessToken } = require('../middleware/auth0.middleware');
// create a user router for all user routes
const songRouter = express.Router();

songRouter.post('/', validateAccessToken, songController.postSong);
songRouter.get('/', validateAccessToken, songController.getSongs);
songRouter.get('/:id', validateAccessToken, songController.getSong);
songRouter.put('/:id', validateAccessToken, songController.updateSong);
songRouter.delete('/:id', validateAccessToken, songController.deleteSong);
songRouter.put('/:id/play', validateAccessToken, songController.addPlay)
module.exports = {songRouter};