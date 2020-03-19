const users = []

// addUser, removeUser, getUser, getUsersInRoom
const getUser = (username) => {
    return users.find(user => user.username === username)
}

const addUser = ({ username, password, phone }) => {
    // Clean the data
    username = username.trim().toLowerCase()
    
    // validate the data
    if(!username || !password || !phone) {
        return {
            error: "Username, password, and phone are required"
        }
    }

    // Check for existing user
    const existingUser = users.find(user => {
        return user.username === username
    })


    // Validate username
    if (existingUser) {
        return {
            error: 'Username is in use'
        }
    }

    // Store User
    const user = { username, password, phone, verificationCode: '' }
    users.push(user)
    console.log(users)
    return { user }
}

const addVerificationCode = ({ username, code }) => {
    // Clean the data
    username = username.trim().toLowerCase()

    // validate the data
    if(!username || !code) {
        return {
            error: "Username and code are required"
        }
    }

    const user = getUser(username)

    user.verificationCode = code
    console.log(users)

    return { user }
}

module.exports = {
    getUser,
    addUser,
    addVerificationCode
}
