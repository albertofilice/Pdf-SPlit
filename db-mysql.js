
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
    
    var row = rows[0];             
                   
    var email = row.email;
    
    console.log('risulta: ', email);
      
    callback(email);
 
  });
  
  connection.end();
    
}

