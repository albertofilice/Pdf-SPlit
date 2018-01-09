
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
  
  var queryString = 'SELECT email FROM users WHERE codicefiscale = ' + mysql.escape(cf);

  connection.query(queryString, function(err, rows, fields) {
    
    if (err) throw err;
                   
    console.log('codice fiscale in db query: ', cf);
    
    console.log('risulta: ', rows);
      
    callback(rows);
 
  });
  
  connection.end();
    
}

