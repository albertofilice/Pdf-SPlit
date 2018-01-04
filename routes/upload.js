
var express = require('express');

var router = express.Router();

router.get('/upload', function(req, res, next) {
  
  res.writeHead(200, {'Content-Type': 'text/html'});
  
  res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
  
  res.write('<input type="file" name="filetoupload"><br>');
  
  res.write('<input type="submit">');
  
  res.write('</form>');
  
  return res.end();
  
});

module.exports = router;
