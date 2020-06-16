require('../src/db/mongoose')

const User = require('../src/models/user')

// User.findByIdAndUpdate('5ee872486cf1650a00a7fe84', { age: 22 }).then(user => {
//     console.log(user)

//     return User.countDocuments({ age: 22 })
// }).then(count => {
//     console.log(count)
// }).catch(error => {
//     console.log(error)
// })

// async/await
const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount('5ee872a341205b3e644bbbbc', 22).then(count => {
    console.log(count)
}).catch(err => {
    console.log(err)
})