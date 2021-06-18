let editor = new Quill('.editor',{
    placeholder:'Type something cool...',
    scrollingContainer:document.querySelector('#container-textarea')
});







function post(){
    let content = editor.getContents().ops[0].insert;
    let swibbletData = {
        content:content,
        token:Cookies.get('token')
    }
    let url = '/action/swibblet';
    let options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(swibbletData),
    };
    fetch(url,options)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.success){
                editor.setText('');
                window.location.replace('/home');
            }
            else {
                
            }
        });

}