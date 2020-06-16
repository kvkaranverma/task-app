require('../src/db/mongoose')

const Task = require('../src/models/task')

Task.findByIdAndDelete('5ee87465a657460b74b2132b').then((task) => {
    console.log('Deleted Task: ' + task)

    return Task.countDocuments({ completed: false })
}).then(tasks => {
    console.log(tasks)
}).catch(error => {
    console.log(error)
})