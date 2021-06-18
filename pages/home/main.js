function loadSwibbletsOnPageLoad(){
    //temp , it needs to be POST later obv for practical purposes
    let fetchUrl = '/api/swibblet/fetchall';
    fetch(fetchUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(outputSwibblet);
            //outputSwibblet(data[0]);
           // outputSwibblet(data[1]);
            //outputSwibblet(data[2]);
            
        });

}


function outputSwibblet(swibblet){
    let swibbletItem = 
    `
    <div class="swibblet flex">
    <div class="swibblet-root flex">
        <div class="swibblet-secondary flex flex-center">
            <div class="swibblet-bubble">
                <div class="swibblet-pfp border-circle"></div>
            </div>
        </div>
        <div class="swibblet-primary">
            <div class="swibblet-br"></div>
            <div class="swibblet-br"></div>
            <div class="swibblet-author flex flex-v-center">
                <div class="swibblet-username">@${swibblet.author.username}</div>
            </div>
            <div class="swibblet-br"></div>
            <div class="swibblet-br"></div>
            <div class="swibblet-content">
                <div class="swibblet-message">
                    <p>
                    ${swibblet.content}
                    </p>
                </div>
            </div>
            <div class="swibblet-br"></div>
            <div class="swibblet-menu">
            </div>
        </div>
    </div>

</div>

    
    `;

    let swibbletGap = `<div class="swibblet-gap"></div>`;

    let contentContainer = document.querySelector('.content-root');
    contentContainer.insertAdjacentHTML("beforeend",swibbletItem+swibbletGap);

}









function postSwibblet(){
    window.location.replace('/action/swibblet');
}
















function loadProfileBubble(){
    let profileBubble = document.querySelector('#profile-bubble');
    profileBubble.style.background = "url(./assets/pfp1.png)";
    profileBubble.style.backgroundPosition = "center center";
    profileBubble.style.backgroundSize = "cover";
    profileBubble.style.backgroundRepeat = "no-repeat";
}

function testLoadSwibbletBubble(){
    let swibbletBubble = document.querySelector('#sab-17');
    swibbletBubble.style.background = "url(./assets/pfp1.png)";
    swibbletBubble.style.backgroundPosition = "center center";
    swibbletBubble.style.backgroundSize = "cover";
    swibbletBubble.style.backgroundRepeat = "no-repeat";
}


loadSwibbletsOnPageLoad();
//loadProfileBubble();
//testLoadSwibbletBubble();