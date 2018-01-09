
var nodemailer = require('nodemailer');

var smtpTransport = require('nodemailer-smtp-transport');

var fs = require("fs");

module.exports = function(to, attachments, callback){

  console.log('to: ', to);  
  
  console.log('attachments: ', attachments);
  
  var transporter = nodemailer.createTransport(
    
    smtpTransport(
      
      {
        service: 'Gmail',
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
          user: 'wdltest470@gmail.com',
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
    
    from: 'wdltest470@gmail.com',
    
    subject:" Cedolini ",
    
    text: "Studio Pantano le invia il cedolino per ill mese corrente",
    
    attachments:[
    {
      'filename':'Cedolini.pdf',
      'path': attachments
    }
    ],
    
    to: to
    
  }, function(error, info) {
    
    if (error) {
      
      callback(false, to);
      
      return console.log('transporter sendMail: ', error);
      
    }
    
    console.log('Message %s sent: %s', info.messageId, info.response);
    
    console.log("Mail sent successfully");
    
    callback(true, to);
    
  });
  
}
