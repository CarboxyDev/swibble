const router = require('express').Router();
const bcrypt = require('bcrypt');
const { response } = require('express');
const {v4:uuid, validate} = require('uuid');
const checks = require('../js/checks');



router.get('/login',(req,res) => {
    res.sendFile('login.html',{root:PATH.login});

});

router.get('/register',(req,res) => {
    res.sendFile('register.html',{root:PATH.register});
});










router.post('/login',async(req,res) => {
    console.log('[-] POST : login');
    try {
        let username = req.body.username;
        let password = req.body.password;

        let fetchedUser = await db.users.fetchUser(username);

        if (fetchedUser == null){
            res.status(400).json({success:false,message:'User not found'});
        }
        else if (fetchedUser != null){
            let verify = await bcrypt.compare(password,fetchedUser.password);
            if (verify){
                //change cookie maxAge in production obv
                res.cookie('token',fetchedUser.token,{maxAge:1000*60*60*12,sameSite:'strict'});
                res.cookie('avatar',fetchedUser.avatar,{maxAge:1000*60*60*24,sameSite:'strict'});
                res.status(200).json({success:true,message:'Logged in successfully'});
            }
            else {
                res.status(400).json({success:false,message:'Incorrect password'});
            }
        }
    }
    catch (err){
        console.log(err.message);
        res.status(500).json({success:false,message:'Server error'});
    }

});

router.post('/register',async(req,res) => {
    console.log('[-] POST : register');
    try {
        let username = req.body.username;
        let password = req.body.password;
        if (username && password){
            // if user does not already exists
            let usernameChecks = checks.checkUsername(username);
            let passwordChecks = checks.checkPassword(password);
            if (!usernameChecks.success){
                res.status(400).json({success:false,message:usernameChecks.message});
            }
            else if (await db.users.checkIfUserExists(username)){
                // 400 -> client error (bad request)
                res.status(400).json({success:false,message:'Username taken'});
            }
            else if (!passwordChecks.success){
                res.status(400).json({success:false,message:passwordChecks.message});
            }
            else {
                let salt = await bcrypt.genSalt(8);
                let hashedPwd = await bcrypt.hash(password,salt);
    
                const userObj = {
                    username:username,
                    password:hashedPwd,
                    id:new Date().valueOf(),
                    createdAt:new Date(),
                    token:uuid().replaceAll('-','')
                };

                let registerUser = await db.users.registerUser(userObj);
                res.status(201).json({success:true,message:'Account created'});
            }



        }
        else {
            res.status(404).json({success:false,message:'Invalid query'});
        }

    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({success:false,message:'Server error'});
    }
});














// These routes use middleware for authentication

router.use('/',async (req,res,next) => {
    let userToken = req.cookies.token;
    if (userToken == undefined){
        res.send('You must be logged in before accessing this page. <a href="/login">Login</a>');
    }
    else {
        let validateToken = await db.users.validateToken(userToken);
        if (validate){
            next();
        }
        else {
            res.send('You are using an invalid account');
        }
    }
}); 


router.get('/home',async (req,res) => {
    res.sendFile('home.html',{root:PATH.home});
});

router.get('/me',async (req,res) => {
    let user = await db.users.fetchUserByToken(req.cookies.token);
    let username = user.username;
    res.redirect('/user/'+username);
});

module.exports = router;