
var express = require('express'),
    
    router = express.Router(),
    
    multer = require('multer'),
    
    path = require('path'),
    
    split_pdf = require('../split_pdf'),
    
    file_name = ""

var storage = multer.diskStorage({
 
    destination: function(req, file, callback) {
    
      callback(null, './uploads')
    },
    
    filename: function(req, file, callback) {
    
      callback(null, file_name = file.fieldname + '-' + Date.now() + path.extname(file.originalname))
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

var split_pdf_handler = function (req, res, nex){
  console.log('split handler started ...')
  
  split_pdf(
    path.join()
  )
}

router.post('/', uploading, function(req, res) {
  
  res.end('file is uploaded')
  
})

module.exports = router
