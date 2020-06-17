const express = require('express')
require('./db/mongoose')


const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// Middleware function
// Without middleware:  new request => run route handler
// With middleware:  new request => do something => run route handler
// app.use((req, res, next) => {
//     // console.log(req.method, req.path)
//     // next()
    
//     if(req.method === 'GET') {
//         res.send('GET requests are disabled')
//     }
//     else {
//         next()
//     }
// })

// app.use((req, res, next) => {
//     res.status(503).send('Site is under maintenance. Check back soon')
// })

app.use(express.json())
app.use(userRouter, taskRouter)


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

const Task = require('./models/task')
const User = require('./models/user')

const main = async () => {
    // const task = await Task.findById('5eea4cba11b9f14cd00199d2')
    // await task.populate('assignee').execPopulate()     // populate allows us to generate data from relationship
    // console.log(task.assignee)

    const user = await User.findById('5eea4bbd079e8839bc9a1ab6')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
}

main()