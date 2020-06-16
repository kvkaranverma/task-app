const mongoose = require('mongoose')
const validator = require('validator')

// URL here below: task-manager-api is the name of the database
const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api'
// Setting up connection
mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true
})

// Creating model
const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if(value < 0) {
                throw new Error('Age must be greater than one')
            }
        }
    },
    email: {
        type: String,
        required:  true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is not valid!')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if(validator.equals(value, 'password') || !validator.isLength(value, {min: 4, max: 20})) {
                throw new Error('Password must have atleast 4 characters')
            }
        }
    }
})

// Creating instance
const me = new User({
    name: 'Damon',
    email: 'DAmon@gmail.com',
    password: 'abcdefgh'
})

//Saving instance to the database
me.save().then((me) => {
    console.log(me)
}).catch((error) => {
    console.log('error!', error)
})