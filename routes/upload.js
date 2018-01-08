
var express   = require('express'),
    
    router    = express.Router(),
    
    multer    = require('multer'),
    
    path      = require('path'),
    
    split_pdf = require('../split_pdf'),
    
    db        = require('../db-mysql'),
    
    email     = require('../email-sender');

    
    
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



function query_and_send(cf_arr, callback){
  
  var not_sent_to = "";
  
  for (var cf in cf_arr){
    
    db(cf, function(raws){
      
      console.log(raws);
      
      attachment = cf + '.pdf';
      
      email(raws.email, path.join('./splitted', attachment), function(sent){
        
        console.log(sent);
        
        if (! sent)
          
          not_sent_to += raws.email + ',';
          
          console.log(not_sent_to);
        
      });
      
    });
    
  }
  
  callback(not_sent_to);
}



router.post('/', uploading, function (req, res) {
  
  
  var cf_list;
  
  var new_dir = path.join('./splitted', Date.now()); 
  
  fs.mkdirSync(new_dir);
  
  split_pdf('./uploads/userFile.pdf', new_dir, function(cf_list){
    
    
    console.log(cf_list);
    
    var cf_arr = cf_list.split(",");
    
    cf_arr.pop();
    
    console.log(cf_arr);
      
    query_and_send(cf_arr, function(not_sent_to){
      
      res.end('done');
      
    });
    
  });
  
});

module.exports = router
