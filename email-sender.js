
var nodemailer = require('nodemailer');

var smtpTransport = require('nodemailer-smtp-transport');

var fs=require("fs");

module.exports = function(to, attachments, callback){

  console.log('to: ', to);  
  
  var transporter = nodemailer.createTransport(
    
    smtpTransport(
      
      {
        service: 'Aruba',
        host: 'smtp.aruba.it',
        port: 465,
        auth: {
          user: 'Test@webdevelopmentlab.it',
          pass: 'Naruto43!'
        }
      }
      
    )
  );
  
  // verify connection configuration
  transporter.verify(function(error, success) {

    if (error) {
      
      console.log('transporter verify: ', error);

    } else {

      console.log('Server is ready to take our messages');
    }

    
  });
  
  transporter.sendMail({
    
    from: 'Test@webdevelopmentlab.it',
    
    subject:" hello from node-split-app ",
    
    text: "fattura",
    
    Attachments:[
    {
      'filename':'fattura.pdf',
      'path': attachments
    }
    ],
    
    to: to
    
  }, function(error, info) {
    
    if (error) {
      
      callback(false);
      
      return console.log('transporter sendMail: ', error);
      
    }
    
    console.log('Message %s sent: %s', info.messageId, info.response);
    
    console.log("Mail sent successfully");
    
    callback(true);
    
  });
  
}
