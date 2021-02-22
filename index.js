const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const cors = require('cors')

const userRoutes = require("./routes/user");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: [
      process.env.FRONT_END_URL
    ],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/user", userRoutes);

const port = process.env.PORT || 4000;

mongoose
  .connect(
    process.env.CONNECTION_STRING,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    }
  )
  .then((res) => {
    console.log("connected to db");
    app.listen(port, () => {
      console.log(`server hosting at https://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
