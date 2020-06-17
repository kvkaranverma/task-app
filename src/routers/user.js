const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/test', (req, res) => {
    res.send('From a new file')
})

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    }
    catch(e) {
        res.status(400).send(e)
    }
})

router.get("/users", async (req, res) => {

    try {
        const users = await User.find({})
        res.status(201).send(users)
    }
    catch(error) {
        res.status(500).send(error)
    }
})

router.get("/user/:id", async (req, res) => {
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

router.patch('/user/:id', async (req, res) => {
    const id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'age', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates'})
    }

    try {
        //const user = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
        
        const user = await User.findById(id)
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

        if(!user) {
            return res.status(404).send()
        }
        res.send(user)
    }
    catch(error) {
        res.status(400).send(error)
    }

})

router.delete('/user/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if(!user) {
            return res.status(404).send()
        }
        res.send(user)
    }
    catch(error){
        res.status(500).send()
    }
})


module.exports = router