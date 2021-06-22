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

exports.fetchUserByToken = async(token) => {
    let user = await User.findOne({token:token});
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

exports.changeUserAvatar = async(token,assetName) => {
    let user = await User.findOne({token:token});
    if (user){
        let updateAvatar = await User.updateOne({token:token},{avatar:assetName});
        if (updateAvatar){
            console.log('avatar!');
            return {success:true};
        }
        else {
            return {success:false};
        }
    }
    else {
        return {success:false};
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