// User.js
var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  "userName": String,
  "data": [{
    "title": String,
    "permalink": String,
    "created": Number,
    "categ": String
  }]
});
mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');