var mongoose = require("mongoose");

var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = mongoose.Schema({
  name: String,
  password: String
})


//Passportlocalmongoose adds methos to the user schema.
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);