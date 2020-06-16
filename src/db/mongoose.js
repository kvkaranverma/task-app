const mongoose = require('mongoose')

// URL here below: task-manager-api is the name of the database
const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api'
// Setting up connection
mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true
})
