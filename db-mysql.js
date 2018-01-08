
var mysql = require('mysql');

module.exports = function(cf, callback){
    
  var connection = mysql.createConnection(
    {
      host     : 'localhost',
      user     : 'test',
      password : 'test_123',
      database : 'test',
    }
  );
  
  connection.connect();
  
  var queryString = 'SELECT email FROM users WHERE codicefiscale=' + cf;

  connection.query(queryString, function(err, rows, fields) {
    
    if (err) throw err;
      
    var email = rows[0].email;
    
    console.log('result: ', email);
      
    callback(email);
 
  });
  
  connection.end();
    
}

