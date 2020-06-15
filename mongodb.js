// CRUD - Create, Read, Update and Delete

// const mongodb = require('mongodb')

// // To initialise the client
// const MongoClient = mongodb.MongoClient

// //Creating own objectID
// const ObjectId = mongodb.ObjectID

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'


MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, client) => {
    if(error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)

    db.collection('users').deleteMany({
        age: 23
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
})
