const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const { Users } = require('../models');
const randomPassword = require('./randomPassword');
dotenv.config();

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CREDENTIAL_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CREDENTIAL_CLIENT_SECRET,
    callbackURL: '/users/google/redirect',
    passReqToCallback: true
},
async (req, accessToken, refreshToken, profile, done) => {
    const { email } = profile._json;
    let user = await Users.findOne({ email:email });
    if ( !user ) { 
        const { name} = profile._json;
        let password = randomPassword(10);
        password = await bcrypt.hash(password, 10);
        user = await Users.create({
            name,
            email,
            password
        });
    }
    const token = jwt.sign( {_id : user._id}, process.env.JWT_ACCESS_TOKEN );
    req.headers['auth-token'] = `Bearer ${token}`;
    return done(null, user); 
}
));