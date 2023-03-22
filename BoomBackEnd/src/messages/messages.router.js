const express = require("express");
const jwt_decode = require('jwt-decode');
const axios = require('axios');
const {
  getAdminMessage,
  getProtectedMessage,
  getPublicMessage,
} = require("./messages.service");
const { validateAccessToken } = require("../middleware/auth0.middleware.js");

const messagesRouter = express.Router();

messagesRouter.get("/public", (req, res) => {
  const message = getPublicMessage();

  res.status(200).json(message);
});

messagesRouter.get("/protected", validateAccessToken, async (req, res) => {
  const [bear, credentials] = req.headers.authorization.split(' ');
  const decoded = jwt_decode(credentials);
  console.log(credentials);
  const response = await axios.get('https://taiwotriumphant.eu.auth0.com/userinfo', {
    headers: {
      authorization: `Bearer ${credentials}`
    }
  })
  const message = getProtectedMessage();

  res.status(200).send(response.data);
});

messagesRouter.get("/admin", validateAccessToken, (req, res) => {
  const message = getAdminMessage();

  res.status(200).json(message);
});

module.exports = { messagesRouter };
