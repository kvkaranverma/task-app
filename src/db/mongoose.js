const mongoose = require('mongoose')

// Setting up connection
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
})
