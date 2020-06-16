require('../src/db/mongoose')

const Task = require('../src/models/task')

// Promise chaining
// Task.findByIdAndDelete('5ee87465a657460b74b2132b').then((task) => {
//     console.log('Deleted Task: ' + task)

//     return Task.countDocuments({ completed: false })
// }).then(tasks => {
//     console.log(tasks)
// }).catch(error => {
//     console.log(error)
// })

// async/await
deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })
    return count
}

deleteTaskAndCount('5ee8ea0db00ffd0b08d9cb7c').then(count => {
    console.log(count)
}).catch(err => {
    console.log(err)
})
