// CRUD - Create, Read, Update and Delete

// const mongodb = require('mongodb')

// // To initialise the client
// const MongoClient = mongodb.MongoClient

// //Creating own objectID
// const ObjectId = mongodb.ObjectID

const { MongoClient, ObjectId, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID() // To generate a new ID
console.log(id)
console.log(id.getTimestamp())

MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, client) => {
    if(error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)

    // Inserting a single user

    db.collection('users').insertOne({
        _id: id,
        name: 'Damon',
        age: 27
    }, (error, result) => {
        if(error) {
           return console.log('Unable to insert user')
        }

        console.log(result.ops)
    })

    // Inserting multiple users

    // db.collection('users').insertMany([
    //     {
    //         name: 'Elena',
    //         age: 22
    //     },
    //     {
    //         name: 'Jen',
    //         age: 23
    //     }
    // ], (error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert documents!')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'This is description of the task one',
    //         completed: true
    //     },
    //     {
    //         description: 'This is description of the task two',
    //         completed: false
    //     },
    //     {
    //         description: 'This is description of the task three',
    //         completed: true
    //     }
    // ], (error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert the document')
    //     }

    //     console.log(result.ops)
    // })


})
