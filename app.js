const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const cors = require('cors')
const db = require('./config/db.config')
dotenv.config()

const app = express();
const PORT= process.env.PORT;

// app.use(morgan(':url :method'));
app.use(morgan('combined'));
app.use(express.json());
app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send("welcome sourabh bhai");
})
app.get('/khaho',(req,res)=>{
    res.send("Surat mai hu bhai");
})
app.get('/kyachalrhah',(req,res)=>{
    res.send("last year chal rha h bhai joining ka wait kar rahe h");
})
app.get('/joiningkabh',(req,res)=>{
    res.send("abhi date nhi aai h bhai");
})
app.listen(PORT,()=>{
    console.log(`App is running on the PORT ${PORT}`);
}) 