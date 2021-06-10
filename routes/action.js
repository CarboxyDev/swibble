const router = require('express').Router();





router.get('/post', async (req,res) => {
    let userToken = req.cookies.token;
    if (userToken == undefined){
        res.send('You must be logged in before accessing this page');
    }
    else {
        let validateToken = await db.users.validateToken(userToken);
        if (validateToken){
            res.sendFile('post.html',{root:PATH.action});
        }
        else {
            res.send('You are using an invalid account token');
        }
    }
});

router.post('/post',async (req,res) => {
    console.log('[+] POST : action > post');
    try {
        res.status(200).json({success:true,message:'Post published'});
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({success:false,message:'Server error'});
    }
});










module.exports = router;