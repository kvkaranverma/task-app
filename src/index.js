const express = require('express')
require('./db/mongoose')

const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    }
    catch(e) {
        res.status(400).send(e)
    }
})

app.get("/users", async (req, res) => {

    try {
        const users = await User.find({})
        res.status(201).send(users)
    }
    catch(error) {
        res.status(500).send(error)
    }
})

app.get("/user/:id", async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        if(!user) {
            return res.status(404).send()
        }
        res.status(201).send(user)
    }
    catch(error) {
        res.status(500).send(error)
    }
})

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    }
    catch(error) {
        res.status(400).send(error)
    }
})

app.get('/tasks', async (req, res) => {

    try {
        const tasks = await Task.find({})
        res.status(201).send(tasks)
    }
    catch(error) {
        res.status(500).send(error)
    }
    
})

app.get('/task/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)
        res.status(201).send(task)
    }
    catch(error) {
        res.status(500).send(error)
    }
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})