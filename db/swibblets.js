const Swibblet = require('../models/swibblets');


exports.createSwibblet = async (swibbletObj) => {
    console.log('[+] Creating a swibblet');
    let fetchAuthor = await db.users.fetchUserByToken(swibbletObj.token);

    let swibblet = new Swibblet({
        author:{
            username:fetchAuthor.username,
            id:fetchAuthor.id
        },
        content : swibbletObj.content
    });

    let saveSwibblet = await swibblet.save();
    return true;
}

exports.fetchAllSwibblets = async() => {
    console.log('[+] Fetch all swibblets');
    let fetchData = Swibblet.find({});
    return fetchData;
}