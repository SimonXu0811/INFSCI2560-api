const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: String,
    firstName: String,
    lastName: String,
    address: String,
    phonenumber: Number,
    role: String
});

UserSchema.pre('save', function(callback) {
    var user = this;
    if(!user.isModified('password')) {
        return callback();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return callback(err);
        }
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if(err){
                return callback(err);
            }

            user.password = hash;
            callback();
        })
    })
});

UserSchema.methods.verifyPassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
};

module.exports = mongoose.model('user', UserSchema);