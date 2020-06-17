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

// Example learning
const pet = {
    name: 'Rocket'
}

pet.toJSON = function() {
    // console.log(this)
    // return this
    return {}
}

console.log(JSON.stringify(pet))