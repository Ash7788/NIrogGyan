const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const passportConfig = require('./services/passport');


const userRoutes = require('./routes/user');


const app = express();
app.use(cors());


mongoose
  .connect('mongodb://localhost:27017/nirogGyanUsers', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((msg) => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(
  session({
    secret: "My first health test results app",
    resave: false,
    saveUninitialized: false,
  })
);


app.use(passport.initialize());
app.use(passport.session());
passportConfig();


app.use('/', userRoutes);


app.listen(5001, () => {
  console.log('Server is running on port 5001');
});
