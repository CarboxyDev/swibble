const router = require('express').Router();


router.get('/:username',(req,res) => {
    res.sendFile('user.html',{root:PATH.user});
})




module.exports = router;