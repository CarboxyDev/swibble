const User = require('../models/users');

exports.registerUser = async(userObj) => {
    let user = new User(userObj);
    user.save()
        .then(result => {
            console.log('[+] New user registered');
            return true;
        })
        .catch(error => {
            console.log(error);
            return false;
        });
};

exports.fetchUser = async(username) => {
    let user = await User.findOne({username:username});
    return user;
}

exports.checkIfUserExists = async(username) => {
    username = username.toLowerCase();
    let check = await User.find({username:username});
    if (check.length == 0){
        return false;
    }
    else {
        return true;
    }
}


exports.validateToken = async(token) => {
    let validate = await User.find({token:token});
    if (validate.length == 0){
        return false;
    }
    else {
        return true;
    }
}