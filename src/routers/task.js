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

router.get('/tasks', auth, async (req, res) => {

    try {
        //const tasks = await Task.find({ assignee: req.user._id })
        
        // if(!tasks) {
        //     res.status(404).send()
        // }
        //res.status(201).send(tasks)
        //alternative
        await req.user.populate('tasks').execPopulate()
        res.status(201).send(req.user.tasks)
    }
    catch(error) {
        res.status(500).send(error)
    }
    
})

router.get('/task/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        //const task = await Task.findById(_id)
        const task = await Task.findOne({ _id, assignee: req.user._id })

        if(!task) {
            res.status(404).send()
        }
        res.status(201).send(task)
    }
    catch(error) {
        res.status(500).send(error)
    }
})

router.patch('/task/:id', auth, async (req, res) => {
    const id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ["description", "completed"]
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({ error: 'Invalid udpdates' })
    }

    try {
        //const task = await Task.findByIdAndUpdate(id, req.body, {new: true, runValidators: true})
        //const task = await Task.findById(id)
        
        const task = await Task.findOne({ _id: id })
        
        if(!task) {
            return status(404).send()
        }
        
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()

        res.send(task)
    }
    catch(error) {
        res.status(400).send(error)
    }
})

router.delete('/task/:id', auth,  async (req, res) => {
    try {
        //const task = await Task.findByIdAndDelete(req.params.id)
        
        // alternative
        const task = await Task.findOneAndDelete({ _id: req.params.id, assignee: req.user._id })
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