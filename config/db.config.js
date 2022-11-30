const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/backendPractice')
.then(()=>{
    console.log('database is connected');
})
.catch((err)=>{
    console.log(err);
})
const db = mongoose.connection;

module.exports = db;