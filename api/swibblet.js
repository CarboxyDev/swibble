const router = require('express').Router();


router.get('/fetchall',async (req,res) => {
    let fetchAll = await db.swibblets.fetchAllSwibblets();
    fetchAll.reverse()
    res.status(200).json(fetchAll);
});



module.exports = router;