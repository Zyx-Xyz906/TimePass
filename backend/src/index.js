require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const mongoose = require("mongoose");
const cors = require("cors");
app.use(express.json());
const MONGO_URL = process.env.MONGO_URL;
const formRoute = require("./Routes/FormRoute");
const formTwoRoute = require("./Routes/FormTwoRoute")
const allowedOrigins = [
 "https://vipul-project.onrender.com",      // e.g. later https://your-frontend.onrender.com  // your React dev server
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));


app.use('/api/forms', formRoute);

app.use('/api/formTwo', formTwoRoute);

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
