const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config()

const db_connection = process.env.DB_CONNECTION;

mongoose.connect(`${db_connection}`)
.then(()=>{
    console.log('database is connected');
})
.catch((err)=>{
    console.log(err);
})

const db = mongoose.connection;

module.exports = db;