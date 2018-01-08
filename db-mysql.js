
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

  
  
  connection.query(queryString, function(err, rows, fields) {
    
    if (err) throw err;
                   
    for (var i in rows) {
       console.log('result rows: ', rows[i].post_title);
    }
    
  
      console.log('fields: ', fields);
      
  });
  
  connection.end();
  
}

