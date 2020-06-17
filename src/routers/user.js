const express = require('express')
const router = express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')

router.get('/test', (req, res) => {
    res.send('From a new file')
})

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    }
    catch(e) {
        res.status(400).send(e)
    }
})

router.post('/user/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()

        user.tokens = user.tokens.concat({ token })
        await user.save()

        res.send({ user, token })
    }
    catch(error) {
        res.status(400).send()
    }
})

router.post('/user/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token)

        await req.user.save()
        res.send()
    }
    catch(error) {
        res.status(500).send()
    }
})

router.post('/users/logoutall', auth, async (req, res) => {
    try {
        req.user.tokens = []

        await req.user.save()
        res.send()
    }
    catch(error) {
        res.status(500).send()
    }
})

router.get("/users/me", auth, async (req, res) => {
    res.send(req.user)
})

router.patch('/user/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'age', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if(!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates'})
    }

    try {
        //const user = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
        const user = req.user
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

        res.send(user)
    }
    catch(error) {
        res.status(400).send(error)
    }

})

router.delete('/user/me', auth, async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user._id)

        // if(!user) {
        //     return res.status(404).send()
        // }

        await req.user.remove()
        res.send(req.user)
    }
    catch(error){
        res.status(500).send()
    }
})


module.exports = router