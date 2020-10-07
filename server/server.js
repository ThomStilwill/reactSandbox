var express = require('express')
var app = express()
var port = process.env.PORT || 4200

require('./routes')(app);

var server = app.listen(port, function(){
  var host = server.address().address;
  if(host = '::') {  // localhost in IPv6
    host = 'localhost';
  }
  var port = server.address().port;
  console.log('Listening at http://%s:%s', host, port);
})
