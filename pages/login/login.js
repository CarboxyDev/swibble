let input = {
    username:document.querySelector('#username'),
    password:document.querySelector('#password'),
    login:document.querySelector('#login'),
}
let subtitle = document.querySelector('#subtitle');

function login(){
    let username = input.username.value;
    let password = input.password.value;
    input.password.value = '';

    let loginObj = {
        username:username,
        password:password
    }

    let url = '/login';
    let options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginObj),
    };
    fetch(url,options)
        .then(response => response.json())
        .then(data => {
            console.log('[CLIENT] Login request sent');

            
            if (data.success){
                subtitle.innerHTML = `<span class="text-green">${data.message}</span>`;
                input.login.innerHTML = '<b>REDIRECTING...</b>';
                let delay = setInterval(() => {
                    window.location.replace('/home');
                    clearInterval(delay);
                },2000);
            }
            else if (!data.success){
                subtitle.innerHTML = `<span class="text-red">${data.message}</span>`;
            }
            
        });
}


function toRegisterPage(){
    window.location.href = '/register';
}