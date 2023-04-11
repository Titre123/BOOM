const express = require('express');
const { profileController } = require('../controllers/profileController');
const { validateAccessToken } = require('../middleware/auth0.middleware');
// create a user router for all user routes
const profileRouter = express.Router();

profileRouter.get('/', validateAccessToken, profileController.getProfile);
profileRouter.get('/songs', validateAccessToken, profileController.getSongsUploadedByUser);

module.exports = {profileRouter};