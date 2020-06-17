const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const Task = require('../models/task')

router.get('/test', (req, res) => {
    res.send('From a new file')
})

router.post('/tasks', auth, async (req, res) => {
    //const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        assignee: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    }
    catch(error) {
        res.status(400).send(error)
    }
})

router.get('/tasks', async (req, res) => {

    try {
        const tasks = await Task.find({})
        res.status(201).send(tasks)
    }
    catch(error) {
        res.status(500).send(error)
    }
    
})

router.get('/task/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)
        res.status(201).send(task)
    }
    catch(error) {
        res.status(500).send(error)
    }
})

router.patch('/task/:id', async (req, res) => {
    const id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ["description", "completed"]
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({ error: 'Invalid udpdates' })
    }

    try {
        //const task = await Task.findByIdAndUpdate(id, req.body, {new: true, runValidators: true})

        const task = await Task.findById(id)
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        
        if(!task) {
            return status(404).send()
        }
        res.send(task)
    }
    catch(error) {
        res.status(400).send(error)
    }
})

router.delete('/task/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if(!task) {
            return res.status(404).send()
        }
        res.send(task)
    }
    catch(error) {
        res.status(500).send()
    }
})


module.exports = router