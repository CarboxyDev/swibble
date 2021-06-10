function adjustProfileBubble(consoleLog=1){
    if (consoleLog){
        console.log('Adjusted profile bubble');
    }
    let bubbleContainer = document.querySelector('#container-pfp');
    let bubbleHeight = bubbleContainer.offsetHeight;
    // to make it a damn round bubble.
    bubbleContainer.style.width = bubbleHeight+"px";

}


// one time function - run on start
function loadProfilePicture(){
    console.log('Loaded profile picture into the profile bubble');
    let bubbleContainer = document.querySelector('#container-pfp');
    bubbleContainer.style.background = "url(https://cdn.discordapp.com/avatars/336826908769779712/7ba727fec9d51144ea1e1e19eb3adef3.png?size=128)";
    bubbleContainer.style.backgroundSize = "cover";
    bubbleContainer.style.backgroundRepeat = "no-repeat";
    bubbleContainer.style.backgroundPosition = "center center";
 

}





adjustProfileBubble(1);
loadProfilePicture();

// sorry for this but its necessary in case the user decides to change the resolution of
// the screen.
let setResponsiveDesignInterval = setInterval(() => {
    adjustProfileBubble(0);
},2000);

