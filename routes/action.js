const router = require('express').Router();




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










module.exports = router;