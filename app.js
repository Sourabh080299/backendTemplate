const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const cors = require('cors');
const db = require('./config/db.config');
const router = require('./routes')

dotenv.config();

const app = express();
const PORT= process.env.PORT;

// app.use(morgan(':url :method'));
app.use(morgan('combined'));
app.use(express.json());
app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());
app.use(cors());
app.use('/',router);


app.listen(PORT,()=>{
    console.log(`App is running on the PORT ${PORT}`);
}) 