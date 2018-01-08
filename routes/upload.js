
var express   = require('express'),
    
    router    = express.Router(),
    
    multer    = require('multer'),
    
    path      = require('path'),
    
    split_pdf = require('../split_pdf'),
    
    db        = require('../db-mysql');

    
    
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



router.post('/', uploading, function (req, res) {
  
  res.write('the file is uploaded, ');
  
  var cf_list;
  
  split_pdf('./uploads/userFile.pdf', './splitted', function(cf_list){
    
    res.write('splitted ');
    
    console.log(cf_list);
    
    var cf_arr = cf_list.split(",");
    
    cf_arr.pop();
    
    console.log(cf_arr);
      
    for (var cf in cf_arr){
      
      db(cf, function(raws){
        
        console.log(raws);
        
      });
      
    }
    
    res.end('done.');
    
  });
  
});

module.exports = router
