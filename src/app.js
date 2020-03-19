// Imports needed modules
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const users = require('../src/utils/users');

// Loads env variables
require('dotenv').config()

// Creates app
const app = express();

// Adds json parsing middleware
app.use(express.json());

// Initializes application port
const port = process.env.PORT || 3000;

// Define paths for Express config
const viewsPath = path.join(__dirname,'./templates/views');
const partialsPath = path.join(__dirname, './templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')));

// Creates base URL route "/" and renders index view
app.get('', (req,res) => {
    res.render('index', {
        title: 'Please Sign In',
    })
})

// Creates forgot-password route and renders view
app.get('/forgot-password', (req,res) => {
    res.render('forgot-password', {
        title: 'Forgot Password',
    })
})

// Creates send-sms endpoint
app.get('/send-sms', (req, res) => {
    const username = req.query.username

    if (!username) {
        return res.status(404).send({
            error: "Please provide username"
        })
    }

    // fetches user
    const user = users.getUser(username)

    if (!user) {
        return res.status(404).send()
    }

    // Generates random six digit number
    const code = Math.random().toString().substring(2, 8)

    // Adds number to user object
    users.addVerificationCode({username, code})

    return res.json({
        message: "Verification sent!"
    })
})

// Verifides code for password change
app.post('/verify-sms', (req, res) => {
    const { code, newPassword, username } = req.body

    if (!code || !newPassword || !username) {
        return res.status(404).send({
            error: "Please provide all information"
        })
    }

    // Looks for user
    const user = users.getUser(username)

    if (!user) {
        return res.status(404).json({
            error: "User not found"
        })
    }

    // Verifies code matches code in user object
    if (user.verificationCode === code) {
        user.password = newPassword

        return res.json({
            message: "Password changed!"
        })
    } else {
        return res.status(400).json({
            message: "That didn't work!"
        })
    }
})

// 'Signs' user in but there's really not a legitimate auth process
app.post('/sign-in', (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(404).send({
            error: "Please provide all information"
        })
    }

    const user = users.getUser(username)

    if (!user) {
        return res.status(404).json({
            error: "User not found."
        })
    }

    if (user.password === password) {
        return res.json({
            message: "You are signed in!"
        })
    } else {
        return res.status(400).json({
            error: "Incorrect password"
        })
    }
})

// Adds user to users list
app.post('/sign-up', (req, res) => {
    const { username, password, phone } = req.body

    if (!username || !password || !phone) {
        return res.status(404).send({
            error: "Please provide all information"
        })
    }

    const newUser = users.addUser({username, password, phone})

    if (newUser.error) {
        return res.status(400).json({
            error: "User may already exist"
        })
    } else {
        return res.status(201).json({
            message: "New user added!"
        })
    }

})

// Catch all route, renders 404 page
app.get('*', (req, res) => {
    res.render('404',
        {
            search: 'page'
        }
    )
})

// Directs app to listen on port specified previously
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})