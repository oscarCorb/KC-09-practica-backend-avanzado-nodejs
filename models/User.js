'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// schema definition
const userSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
});

userSchema.statics.hashPassword = function (pass) {
  return bcrypt.hash(pass, 5);
};

userSchema.methods.comparePasswords = function (pass) {
  return bcrypt.compare(pass, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
