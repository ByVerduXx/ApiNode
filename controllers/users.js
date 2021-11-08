const uuid = require('uuid');
const crypto = require('../crypto')
const userDatabase = {};

const registerUser = (username, password) => {
  let hashedPassword = crypto.hashPasswordSync(password);

  userDatabase[uuid.v4()] = {
    username: username,
    password: hashedPassword
  }
};

const getUserIdFromUserName = (username) => {
  for (let userId in userDatabase) {
    if (userDatabase[userId].username == username) {
      return userDatabase[userId];
    }
  }
};

const checkUserCredentials = (username, password, done) => {
  console.log('checking for credentials')

  let user = getUserIdFromUserName(username);
  if (user) {
    console.log(user);
    crypto.comparePassword(password, user.password, done);
  } else {
    done('Missing user');
  }
  
};

exports.registerUser = registerUser;
exports.checkUserCredentials = checkUserCredentials;