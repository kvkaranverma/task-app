// CRUD - Create, Read, Update and Delete

const mongodb = require('mongodb')

// To initialise the client
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, client) => {
    if(error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)

    // Inserting a single user

    // db.collection('users').insertOne({
    //     name: 'Karan Verma',
    //     age: 23
    // }, (error, result) => {
    //     if(error) {
    //        return console.log('Unable to insert user')
    //     }

    //     console.log(result.ops)
    // })

    // Inserting multiple users

    db.collection('users').insertMany([
        {
            name: 'Elena',
            age: 22
        },
        {
            name: 'Jen',
            age: 23
        }
    ], (error, result) => {
        if(error) {
            return console.log('Unable to insert documents!')
        }

        console.log(result.ops)
    })
})
