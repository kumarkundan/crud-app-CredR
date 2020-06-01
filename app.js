var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var mongoose = require('mongoose');
// localhost starts here 

var connectionString = "mongodb://localhost:27017/CredRDataBase"
let options = {
  authSource: 'admin',
  poolSize: 5,
  useNewUrlParser: true,
  useUnifiedTopology: true
}
mongoose.connect(connectionString, options);

//checking if connected/////////////

var db2 = mongoose.connection;
db2.on('error', console.error.bind(console, 'connection error:'));
db2.once('open', function () {
  // we're connected!
  // console.log(mongoose.connection.readyState);
  if (mongoose.connection.readyState == 1) {
    console.log("connected to DB");

  }
})

////////////////////////////////////

var app = express();
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var handlers = {
  userController: require('./handlers/userController')
};

var routers = require('./routes/routes');
routers.setup(app, handlers);

module.exports = app;
