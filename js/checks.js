exports.checkUsername = (username) => {
    let response = {}
    // regex to check if it contains anything other than alpha,num and underscores
    let regex = /^[A-Za-z0-9_]*$/i;
    if (username.length < 4){
        response.success = false;
        response.message = "Username can't be so short";
    }
    else if (username.length > 21){
        response.success = false;
        response.message = "Username can't be so long";
    }
    else if (!regex.test(username)){
        response.success = false;
        response.message = "Username can't have those characters";
    }
    else {
        response.success = true;
    }
    return response;
};

exports.checkPassword = (password) => {
    let response = {};
    if (password.length < 6){
        response.success = false;
        response.message = "Password must be bigger";
    }
    else if (password.length > 32){
        response.success = false;
        response.message = "Password can't be so long!";
    }
    else {
        response.success = true;
    }
    return response;
};