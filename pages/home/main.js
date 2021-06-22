function loadSwibbletsOnPageLoad(){
    //temp , it needs to be POST later obv for practical purposes
    // or GET with queries like ?limit=50 or something.
    let fetchUrl = '/api/swibblet/fetchall';
    fetch(fetchUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.forEach(outputSwibblet);
            
        });

}


function outputSwibblet(swibblet){
    let avatarID = uuid();
    let swibbletItem = 
    `
    <div class="swibblet flex flex-row">
    <div class="swibblet-root flex">
        <div class="swibblet-secondary">
            <div class="swibblet-br"></div>
            <div class="swibblet-br"></div>
            <div class="swibblet-bubble flex flex-center">
                <div class="swibblet-avatar border-circle swibblet-avatar-${avatarID}"></div>
            </div>
        </div>
        <div class="swibblet-primary">
            <div class="swibblet-br"></div>
            <div class="swibblet-br"></div>
            <div class="swibblet-author flex flex-column flex-v-center">
                <div class="swibblet-username">${swibblet.author.username}</div>
                <div class="swibblet-date flex flex-v-center">
                    <span>${renderSwibbletDate(swibblet.createdAt)}</span>
                </div>
            </div>
            <div class="swibblet-br"></div>
            <div class="swibblet-br"></div>
            <div class="swibblet-content">
                <div class="swibblet-message">
                    <p>${swibblet.content}</p>
                </div>
            </div>
            <div class="swibblet-br"></div>
            <div class="swibblet-br"></div>
        </div>
    </div>
    <div class="swibblet-menu flex flex-column">
        <div class="swibblet-info"></div>
        <div class="swibblet-likes flex flex-column">
            <div class="likes-logo flex flex-v-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"/></svg>
            </div>
            <div class="menu-gap"></div>
            <div class="likes-amount flex flex-v-center">
                <span>0</span>
            </div>
        </div>
        <div class="swibblet-comments flex flex-column">
            <div class="comments-logo flex flex-v-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 32C114.6 32 0 125.1 0 240c0 47.6 19.9 91.2 52.9 126.3C38 405.7 7 439.1 6.5 439.5c-6.6 7-8.4 17.2-4.6 26S14.4 480 24 480c61.5 0 110-25.7 139.1-46.3C192 442.8 223.2 448 256 448c141.4 0 256-93.1 256-208S397.4 32 256 32zm0 368c-26.7 0-53.1-4.1-78.4-12.1l-22.7-7.2-19.5 13.8c-14.3 10.1-33.9 21.4-57.5 29 7.3-12.1 14.4-25.7 19.9-40.2l10.6-28.1-20.6-21.8C69.7 314.1 48 282.2 48 240c0-88.2 93.3-160 208-160s208 71.8 208 160-93.3 160-208 160z"/></svg>
            </div>
            <div class="menu-gap"></div>
            <div class="comments-amount flex flex-v-center">
                <span>0</span>
            </div>
        </div>
        <div class="swibblet-reserved flex flex-center">
            <!--
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"/></svg>
            -->
            </div>
        <div class="swibblet-others flex flex-v-center">
            <svg viewBox="0 0 24 24" aria-hidden="true" class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"><g><circle cx="5" cy="12" r="2"></circle><circle cx="12" cy="12" r="2"></circle><circle cx="19" cy="12" r="2"></circle></g></svg>
        </div>
    </div>
</div>
    
    `;

    let swibbletGap = `<div class="swibblet-gap"></div>`;

    let contentContainer = document.querySelector('.content-root');
    contentContainer.insertAdjacentHTML("beforeend",swibbletItem+swibbletGap);
    let currentAvatar = document.querySelector(`.swibblet-avatar-${avatarID}`);
    if (swibblet.author.avatar == undefined){
        currentAvatar.style.background = "#10161c";
    }
    else {
        currentAvatar.style.backgroundImage = `url(/assets/${swibblet.author.avatar})`;
        currentAvatar.classList.add('bg-image-fix');
    }


}






function renderSwibbletDate(swibbletDate){
    let currentTimestamp = new Date().valueOf();
    let swibbletTimestamp = new Date(swibbletDate).valueOf();
    let hoursDifference = Math.abs(swibbletTimestamp - currentTimestamp) / 36e5;
    let roundedHoursDifference = Math.round(hoursDifference);

    if (hoursDifference > 0 && hoursDifference < 1){
        let minutesDifference = hoursDifference*60;
        if (minutesDifference < 1){
            return "Just now";
        }
        return Math.round(minutesDifference) + "m";
        
    }
    else if (hoursDifference >= 1 && hoursDifference <= 48){
        return roundedHoursDifference + "h";
    }
    else if (hoursDifference > 48 && hoursDifference <= 24*30){
        return Math.round(roundedHoursDifference/24) + "d";
    }
    else {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let date = new Date(swibbletDate);
        return months[date.getMonth()] + " " + date.getDate(); 
    }

}










function postSwibblet(){
    window.location.replace('/action/swibblet');
}


function uuid(){
    var dt = new Date().getTime();
    var uuidString = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuidString;
}




function loadSelfProfileBubble(){
    let myAvatar = Cookies.get('avatar');
    if (myAvatar){
        let profileBubble = document.querySelector('#profile-bubble');
        profileBubble.style.background = `url(/assets/${myAvatar})`;
        profileBubble.style.backgroundPosition = "center center";
        profileBubble.style.backgroundSize = "cover";
        profileBubble.style.backgroundRepeat = "no-repeat";
    }

}

loadSwibbletsOnPageLoad();
loadSelfProfileBubble();
