require('../src/db/mongoose')

const User = require('../src/models/user')

User.findByIdAndUpdate('5ee872486cf1650a00a7fe84', { age: 22 }).then(user => {
    console.log(user)

    return User.countDocuments({ age: 22 })
}).then(count => {
    console.log(count)
}).catch(error => {
    console.log(error)
})