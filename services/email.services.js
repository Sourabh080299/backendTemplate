const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const sendMailTo = async ( receiver ) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD,
        }
    });
      
    const token = jwt.sign({
           _id: receiver._id
        }, process.env.JWT_ACCESS_TOKEN, { expiresIn: '10m' }  
    );    
      
    const mailConfigurations = {
      
        // It should be a string of sender/server email
        from: process.env.NODEMAILER_EMAIL,
      
        to: receiver.email,
      
        // Subject of Email
        subject: 'Email Verification',
          
        // This would be the text of email body
        text: `Hi! There, You have recently visited 
               our website and entered your email.
               Please follow the given link to verify your email
               http://localhost:3000/users/verify/${token} 
               Thanks`
          
    };
      
    transporter.sendMail(mailConfigurations, function(error, info){
        if (error) {
            console.log("your error---------->",error)
        }
        else {
            console.log('Email Sent Successfully');
            console.log(info); 
        }
        
    });
}

module.exports = sendMailTo;