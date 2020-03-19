
const signIn = document.querySelector('#sign-in');
const user = document.querySelector('#username');
const pass = document.querySelector('#password');
const messageOne = document.querySelector('.message-1');

signIn.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = user.value;
    const password = pass.value;

    messageOne.textContent = 'Loading..';

    const data = {
        username,
        password
    }

    fetch('/sign-in', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        response.json()
        .then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.message;
            }
        })
    })
})

const signUp = document.querySelector('#sign-up');
const userSignUp = document.querySelector('#username-sign-up');
const passSignUp = document.querySelector('#password-sign-up');
const numberSignUp = document.querySelector('#phone-sign-up');

signUp.addEventListener('submit', (e) => {
    e.preventDefault();

    const usernameSignUp = userSignUp.value;
    const passwordSignUp = passSignUp.value;
    const phoneSignUp = numberSignUp.value;

    messageOne.textContent = 'Loading..';

    const data = {
        username: usernameSignUp,
        password: passwordSignUp,
        phone: phoneSignUp
    }

    fetch('/sign-up', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        response.json()
        .then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.message;
                userSignUp.value = ''
                passSignUp.value = ''
                numberSignUp.value = ''
            }
        })
    })
})