const mongoose = require('mongoose')

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
        required: true
    },
    age: {
        type: Number,
        validate(value) {
            if(value < 0) {
                throw new Error('Age must be greater than one')
            }
        }
    }
})

// Creating instance
const me = new User({
    name: 'Elena',
    age: -1
})

//Saving instance to the database
me.save().then((me) => {
    console.log(me)
}).catch((error) => {
    console.log('error!', error)
})