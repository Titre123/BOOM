const express = require('express');
const {userController} = require('../controllers/userController');
const { validateAccessToken } = require('../middleware/auth0.middleware')

// create a user router for all user routes
const userRouter = express.Router();

userRouter.post('/', validateAccessToken, userController.postUser);
userRouter.get('/', validateAccessToken, userController.getUsers);
userRouter.get('/:id', validateAccessToken, userController.getUser);
userRouter.put('/:id', validateAccessToken, userController.updateUser);
userRouter.delete('/:id', validateAccessToken, userController.deleteUser);

module.exports = {userRouter};