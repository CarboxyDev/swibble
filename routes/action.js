const router = require('express').Router();
const {v4:uuid, validate} = require('uuid');



router.get('/swibblet', async (req,res) => {
    let userToken = req.cookies.token;
    if (userToken == undefined){
        res.send('You must be logged in before accessing this page');
    }
    else {
        let validateToken = await db.users.validateToken(userToken);
        if (validateToken){
            res.sendFile('create-swibblet.html',{root:PATH.action});
        }
        else {
            res.send('You are using an invalid account token');
        }
    }
});

router.post('/swibblet', async (req,res) => {
    console.log('[+] POST : action > swibblet');
    let swibbletData = req.body;

    try {
        if (await db.users.validateToken(swibbletData.token)){
            let createSwibblet = await db.swibblets.createSwibblet(swibbletData);
            if (createSwibblet){
                res.status(200).json({success:true,message:'Swibblet created'});
            }
            else {
                res.status(500).json({success:false,message:'Database error'});
            }
        }
        else {
            res.status(400).json({success:false,message:'Invalid token'});
        }
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({success:false,message:'Server error'});
    }
});



router.get('/change-avatar',async (req,res) => {
    res.sendFile('change-avatar.html',{root:PATH.action});
})

router.post('/change-avatar',async (req,res) => {
    console.log('[-] POST : action > change-avatar');
    try {
        let avatar = req.files.avatar;
        if (avatar.mimetype == 'image/png' || avatar.mimetype == 'image/jpg'){
            let fileExt = avatar.name.substring(avatar.name.length-4,avatar.name.length);
            assetName = uuid().replaceAll('-','') + fileExt;
            assetsPath = __dirname.replace('routes','public') + '/assets/' + assetName;
            avatar.mv(assetsPath,async(error) => {
                if (error){
                    return res.json({success:false});
                }
                let token = req.cookies.token;
                console.log(assetName);
                let updateAvatar = await db.users.changeUserAvatar(token,assetName);
                res.cookie('avatar',assetName,{maxAge:1000*60*60*24,sameSite:'strict'});

                return res.json({success:true});
            });
            
        }
        else {
            res.json({success:false,reason:'Only .png and .jpg files allowed'});
        }
    }
    catch (error){
        console.log(error.message);
        res.json({success:false});
    }

});







module.exports = router;