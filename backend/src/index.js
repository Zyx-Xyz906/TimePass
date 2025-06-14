require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const mongoose = require("mongoose");
const cors = require("cors");
app.use(express.json());
const MONGO_URL = process.env.MONGO_URL;
const formRoute = require("./Routes/FormRoute");

const originWhitelist = [
  process.env.FRONTEND_URL,      // e.g. later https://your-frontend.onrender.com
  'http://localhost:3000'        // your React dev server
];

app.use(cors({
  origin: originWhitelist,
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true
}));


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
