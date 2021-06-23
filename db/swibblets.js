const { update } = require('../models/swibblets');
const Swibblet = require('../models/swibblets');


exports.createSwibblet = async (swibbletObj) => {
    console.log('[+] Creating a swibblet');
    let fetchAuthor = await db.users.fetchUserByToken(swibbletObj.token);
    let swibblet = new Swibblet({
        author:{
            username:fetchAuthor.username,
            id:fetchAuthor.id,
            avatar:fetchAuthor.avatar
        },
        content : swibbletObj.content
    });
    let saveSwibblet = await swibblet.save();
    return true;
}


exports.updateSwibbletAvatars = async(token) => {
    let fetchUser = await db.users.fetchUserByToken(token);
    

    if (fetchUser){
        let newAvatar = fetchUser.avatar;
        let updateObj = {
            author : {
                username:fetchUser.username,
                id:fetchUser.id,
                avatar:newAvatar
            }
        }

        let updateSwibblets = await Swibblet.updateMany(updateObj);
        console.log('[-] Updated all swibblet avatars of user ',fetchUser.username);
        return updateSwibblets;
      }
}



exports.fetchAllSwibblets = async() => {
    console.log('[+] Fetch all swibblets');
    let fetchData = await Swibblet.find({});
    return fetchData;
}