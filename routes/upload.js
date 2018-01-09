
var express   = require('express'),
    
    router    = express.Router(),
    
    multer    = require('multer'),
    
    path      = require('path'),
    
    split_pdf = require('../split_pdf'),
    
    db        = require('../db-mysql'),
    
    email     = require('../email-sender'), 
    
    date      = require('node-datetime'),
    
    fs        = require('fs');

    
    
var storage = multer.diskStorage({
 
    destination: function(req, file, callback) {
    
      callback(null, './uploads')
    },
    
    filename: function(req, file, callback) {
      
      callback(null, file.fieldname + path.extname(file.originalname))
      // '-' + Date.now() +
    }
})
    


var uploading = multer({
    
  storage: storage,  
  
  fileFilter: function(req, file, callback){
    
    var ext = path.extname(file.originalname)
    
    if (ext !== '.pdf') {
      
      return callback(res.end('Only PDF are allowed'), null)
    }
    
    callback(null, true)
  }
}).single('userFile');



function query_and_send(cf_arr, dir_path, callback){
  
  console.log('cf_arr: ', cf_arr);
  
  var not_sent_to = '';
  
  var sent_to = '';
  
  for (var cf in cf_arr){
    
    console.log(cf_arr[cf] + '\n');
    
    
    
    db(cf_arr[cf], function(email_address, q){
          
      console.log('query to db \n');
      
      attachment = dir_path + '/' + q + '.pdf';
      
      console.log('attachment: ', attachment);
        
      if (email_address.length == 0){
        
        not_sent_to += q + ',';
        
        console.log('no email for ', not_sent_to);
        
      }
        
      else{
        
        console.log('email ?', email_address[0].email);
        
        
        
        email(email_address[0].email, attachment, function(sent, to){
          
          console.log('email callback, sent? ', sent);
          
          if (! sent) not_sent_to += to + ',';
              
          else sent_to += to + ',';
                      
          console.log('not sent to: ', not_sent_to);
         
          console.log('before callback: ', not_sent_to);
          
          callback(not_sent_to);
          
        });  
        
      }
        
    });
    
  }
  
  
}



router.post('/', uploading, function (req, res) {
  
  res.write('the file is uploaded, ');
  
  var cf_list;
  
  var now = date.create();
  
  var formatted = now.format('d-m-Y H:M:S');
  
  var new_dir = path.join('./splitted', formatted); 
  
  fs.mkdirSync(new_dir);
  
  console.log('new dir: ', new_dir);
  
  split_pdf('./uploads/userFile.pdf', new_dir, function(cf_list){
     
    res.write('splitted ');
    
    console.log(cf_list);
    
    var cf_arr = cf_list.split(",");
    
    cf_arr.pop();
    
    console.log(cf_arr);
      
    query_and_send(cf_arr, new_dir, function (not_sent_to, sent_to){
      
      if ( !(not_sent_to == '') ){
        
        var new_unsent_file = './sent-and-unsent/' + formatted + '-unsent-CF' + '.txt';
        
        var new_sent_file = './sent-and-unsent/' + formatted + '-sent-CF' + '.txt';
        
        fs.writeFileSync(new_unsent_file, not_sent_to);
        
        fs.writeFileSync(new_sent_file, not_sent_to);
        
        var not_sent_to_arr = not_sent_to.split(',');
        
        not_sent_to_arr.pop();
        
        res.write('but not sent to: ');
        
        for (var unsent in not_sent_to_arr)
          
            res.write(not_sent_to_arr[unsent]);
      }
      
      res.end(' and done');
      
    });
    
  });
  
});

module.exports = router
