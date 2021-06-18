let input = {
    username:document.querySelector('#username'),
    password:document.querySelector('#password'),

}
let subtitle = document.querySelector('#subtitle');










function register(){
    let username = input.username.value;
    let password = input.password.value;
    let userObj = {
        username:username,
        password:password
    }
    let url = '/register';
    let options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userObj),
    };

    fetch(url,options)
        .then(response => response.json())
        .then(data => {
            if (!data.success){
                subtitle.innerHTML = `<span class="text-red">${data.message}</span>`;
                input.password.value = '';

            }
            else if (data.success){
                subtitle.innerHTML = `<span class="text-green">${data.message}</span>`;
                input.username.value = '';
                input.password.value = '';
            }
        })


}



















function toLoginPage(){
    window.location.href = '/login';
}