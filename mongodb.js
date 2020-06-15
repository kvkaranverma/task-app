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

    // Selecting a single document

    // db.collection('users').findOne({ _id: new ObjectID('5ee778c3f0107c215c5a89c5') }, (error, user) => {  // user is the actual document it returns
    //     if(error) {
    //         return console.log('Unable to fetch')
    //     }

    //     console.log(user)
    // })

    // Selecting multiple documents
    // db.collection('users').find({ age: 22 }).toArray((error, users) => {    // find returns a cursor
    //     if(error) {
    //         return console.log('Unable to select users')
    //     }

    //     console.log(users)
    // })

    db.collection('tasks').find({ completed: true }).toArray((error, tasks) => {
        if(error) {
            return console.log('Unable to feftch users who have completed their task')
        }
        
        console.log(tasks)
    })
})
