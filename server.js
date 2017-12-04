var express = require('express');

// Create our app
var app = express();
const PORT = process.env.PORT || 3000;

// var io = require('socket.io')(server);
app.use(function(req, res, next){
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    // next();
    if(req.headers['x-forwarded-proto'] === 'https'){
      res.redirect('http://'+req.hostname+req.url);
    }
    next();
});

app.use(express.static('public'));

app.listen(PORT, function () {
  console.log('Express server is up on port '+PORT);
});
var server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
