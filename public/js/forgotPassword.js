
const sendSMS = document.querySelector('#send-sms');
const username = document.querySelector('#username');
const messageOne = document.querySelector('.message-1');


sendSMS.addEventListener('submit', (e) => {
    e.preventDefault();

    const user = username.value;

    messageOne.textContent = 'Loading..';

    fetch('/send-sms?username=' + user)
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

const verifyCode = document.querySelector('#verify-sms');
const verificationCode = document.querySelector('#verification-code');
let usernameVerify = document.querySelector('#username-verify');
const password = document.querySelector('#new-password');


verifyCode.addEventListener('submit', (e) => {
    e.preventDefault();

    const code = verificationCode.value;
    const newPassword = password.value;
    usernameVerify = usernameVerify.value

    messageOne.textContent = 'Loading..';

    const data = {
        code,
        newPassword,
        username: usernameVerify
    }
    console.log(data)

    fetch('/verify-sms', {
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