
var nodemailer = require('nodemailer');

var smtpTransport = require('nodemailer-smtp-transport');

var fs=require("fs");

module.exports = function(to, attachments, callback){

  var transporter = nodemailer.createTransport(
    
    smtpTransport(
      
      {
        service: 'Gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'wdltest@gmail.com',
          pass: 'Naruto43!'
        }
      }
      
    )
  );
  
  // verify connection configuration
  transporter.verify(function(error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log('Server is ready to take our messages');
    }
  });
  
  transporter.sendMail({
    
    from: 'wdltest@gmail.com',
    
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
      
      return console.log(error);
      
    }
    
    console.log('Message %s sent: %s', info.messageId, info.response);
    
    console.log("Mail sent successfully");
    
    callback(true);
    
  });
  
}
