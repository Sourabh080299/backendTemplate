const nodemailer = require('nodemailer');

const sendMailTo = async ( receiver , url, action_description, type_of_action ) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD,
        }
    });
    

    const mailConfigurations = {
      
        // It should be a string of sender/server email
        from: process.env.NODEMAILER_EMAIL,
        to: receiver.email,
        subject: type_of_action,
          
        // This would be the text of email body
        text: `${action_description}
               ${url} 
               Thanks`
          
    };
      
    transporter.sendMail(mailConfigurations, function(error, info){
        if (error) {
           
        }
        else {
            console.log(info)
        }        
    });
    // return response;

}

module.exports = sendMailTo;