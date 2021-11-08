const bcrypt = require('bcrypt');

const hashPassword = (plainTextPassword, done) => {
    bcrypt.hash(plainTextPassword, 10, done);
};

const hashPasswordSync = (plainTextPassword) => {
    return bcrypt.hashSync(plainTextPassword, 10);
};

const comparePassword = (plainTextPassword, hash, done) => {
    bcrypt.compare(plainTextPassword, hash, done);
}

exports.hashPassword = hashPassword;
exports.comparePassword = comparePassword;
exports.hashPasswordSync = hashPasswordSync;