const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const { messagesRouter } = require("./messages/messages.router");
const { errorHandler } = require("./middleware/error.middleware");
const { notFoundHandler } = require("./middleware/not-found.middleware");
const {userRouter} = require('./routes/userRoute');
const {songRouter} = require('./routes/songRoute');

dotenv.config();

if (!(process.env.PORT && process.env.CLIENT_ORIGIN_URL)) {
  throw new Error(
    "Missing required environment variables. Check docs for more info."
  );
}

const PORT = parseInt(process.env.PORT, 10);
// const CLIENT_ORIGIN_URL = process.env.CLIENT_ORIGIN_URL;

const app = express();
const apiRouter = express.Router();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/api", apiRouter);
apiRouter.use("/messages", messagesRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/songs', songRouter);

app.use(errorHandler);
app.use(notFoundHandler);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
