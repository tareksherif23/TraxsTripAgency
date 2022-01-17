const mongoose = require('mongoose')
// name , email , photo , pwd , pwdConf

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  photo: String,
  pwd: String,
  pwdConf: String

})

const User = mongoose.model("User", userSchema)

module.exports = User