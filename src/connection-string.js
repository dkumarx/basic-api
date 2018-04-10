/*
*   Master DataBase connection string and configuration 
*   Connection to be setup once and diconnect once application gets closed
*   Ref:
*       Mongoose : https://www.npmjs.com/package/mongoose  
*       MongoDB : https://docs.mongodb.com/manual/introduction/
*/

const mongoose = require('mongoose')

/*
* Build the connection string
* // mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]
*/
const mongoDB = 'mongodb://ctsuser:ctsuser@ds135619.mlab.com:35619/pokies';
// Create the database connection 
mongoose.connect(mongoDB)
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
const db = mongoose.connection

// CONNECTION EVENTS
db.once('open', function() {
  // console.info.bind(console, 'Connected to Main DB')
  console.info('Main DATABASE connection open...')
});

// When DB connected successfully
db.on('connected', () =>{
    console.info.bind(console, 'Master DATABASE connected successfully!!')
})
// When DB connection encounter any connection error OR throws an exception
//Bind connection to error event (to get notification of connection errors)
db.on('error', (err) => {
   console.error.bind(console, 'Master DATABASE connection error:')
})
// When the connection is disconnected
db.on('disconnected', () => {
    // console.info.bind(console, 'Master DATABASE disconnected')
    console.log('Master DATABASE disconnected')
})

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
    db.close(function () { 
        console.log('Disconnected "Master DATABASE" through app termination'); 
        process.exit(0); 
    }); 
}); 

module.exports.db = db