let form = document.querySelector('#uploadForm');
form.addEventListener('submit',(e) => {
    e.preventDefault();
    uploadFile();
});


function uploadFile(){
    let formData = new FormData();
    let fileElem = document.querySelector('#selectedFile');
    let file = fileElem.files[0];

    formData.append('avatar',file);
    
    
    if (file != undefined){
        let url = '/action/change-avatar';
        let options = {
            method: 'POST',
            body: formData
        };
        console.log(options);
        fetch(url,options)
            .then(res => res.json())
            .then(data => {
                window.location.replace('/home');
            });
    
    }
    else {
        console.log('Need to select a file first!');
    }


}