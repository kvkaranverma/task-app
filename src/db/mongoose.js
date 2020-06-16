const mongoose = require('mongoose')

// URL here below: task-manager-api is the name of the database
const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api'
// Setting up connection
mongoose.connect(connectionURL, {
    useUnifiedTopology: true,
    useCreateIndex: true
})

// Creating model
const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
})

// Creating instance
const me = new User({
    name: 'Karan Verma',
    age: 23
})

//Saving instance to the database
me.save().then((me) => {
    console.log(me)
}).catch((error) => {
    console.log('error!', error)
})