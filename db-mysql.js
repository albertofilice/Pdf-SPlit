
var mysql = require('mysql');

module.exports = function(query){
    
  var connection = mysql.createConnection(
    {
      host     : 'localhost',
      user     : 'test',
      password : 'test_123',
      database : 'test',
    }
  );
  
  connection.connect();
  
  var queryString = 'SELECT * FROM users';
  
  connection.query(queryString);

  
  
  query.on('error', function(err) {
    
    throw err;

  });
  
  
  
  query.on('fields', function(fields) {
  
    console.log(fields);
  
  });
  
  
  
  query.on('result', function(row) {
    
    connection.pause();
    
    //do cose
  
    console.log(row);
    
    connection.resume();

  });
  


  connection.end();
  
}

