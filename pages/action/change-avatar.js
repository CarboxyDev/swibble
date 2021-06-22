let form = document.querySelector('#uploadForm');


function uploadFile(){
    let fileElem = document.querySelector('#upload');
    let file = fileElem.files[0];
    if (file != undefined){
        let url = '/action/upload-pfp';

        console.log(file);
        let options = {
            method: 'POST',
            body: file
        };
        console.log(options);
        fetch(url,options)
            .then(res => res.json())
            .then(data => {
    
            });
    
    }
    else {
        console.log('Need to select a file first!');
    }


}