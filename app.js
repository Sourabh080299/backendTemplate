const express = require('express');
const bodyparser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');


const db = require('./config/db.config');


const passport = require('passport');
const cookieSession = require('cookie-session');
const session = require('express-session');
const passportSetup = require('./config/passportSetup');

const morgan = require('morgan');
const colors = require("colors");

const router = require('./routes')

dotenv.config();
const app = express();
const PORT= process.env.PORT;


// app.use(morgan(':url :method'));
// app.use(morgan('combined'));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());
// app.use(cookieSession({
//     name: 'google-auth-session',
//     keys: ['secret1', 'secret2']
// }));
// app.use(express.session({ secret: 'SECRET' }));
app.use(session({
    secret: 'subtle',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/',router);

app.listen(PORT,()=>{
    console.log(`App is running on the PORT ${`${PORT}`.bold.blue}`);
}) 