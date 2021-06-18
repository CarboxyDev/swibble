console.log('[+] server.js opened');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();
require('dotenv').config();
let connectedtoDatabase = false;


const PORT = process.env.PORT || 3000;
global.PATH = {
    public:path.join(__dirname,'public'),
    pages:path.join(__dirname,'pages'),
    assets:path.join(__dirname,'assets'),
    login:path.join(__dirname,'pages/login'),
    register:path.join(__dirname,'pages/register'),
    home:path.join(__dirname,'pages/home'),
    action:path.join(__dirname,'pages/action'),
    user:path.join(__dirname,'pages/user'),
}
const routes = {
    root:require('./routes/root'),
    action:require('./routes/action'),
}
const api = {
    swibblet : require('./api/swibblet'),
}


global.db = {
    users:require('./db/users'),
    swibblets:require('./db/swibblets'),
}







app.use(express.json());
app.use(cookieParser()); // is a middleware. third party module for cookie operations
app.use(express.static(PATH.public));
app.use(express.static(PATH.assets));
app.use(express.static(PATH.login));
app.use(express.static(PATH.register));
app.use(express.static(PATH.home));
app.use(express.static(PATH.action));
app.use(express.static(PATH.user));

// ROUTERS
app.use('/',routes.root); // all root paths like /login , /home etc
app.use('/action',routes.action);
app.use('/api/swibblet',api.swibblet);


app.get('/',(req,res) => {
    res.sendFile('index.html',{root:PATH.public});
});



server = app.listen(PORT,() => {
    console.log('[+] Server is online');
    connectToDatabase();
});




function connectToDatabase(){
    mongoose.connect(process.env.DB_URL,{useNewUrlParser:true,useUnifiedTopology:true,useCreatedIndex:true})
    .then((result) => {
        connectedtoDatabase = true;
        console.log('[+] Database is online');
    })
    .catch((error) => {
        console.log(error);
        console.log('[-] Failed connecting to database');
        
    });

}