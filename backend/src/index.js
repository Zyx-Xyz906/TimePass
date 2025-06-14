require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const mongoose = require("mongoose");
const cors = require("cors");
app.use(express.json());
const MONGO_URL = process.env.MONGO_URL;
const formRoute = require("./Routes/FormRoute");

app.use(cors({
    origin : [
        // "http://localhost:3000"
        process.env.FRONTEND_URL
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))

app.use('/api/forms', formRoute);

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log("mongoDB is Connect");
    app.listen(PORT, () => {
      console.log(`Server is Listen on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
