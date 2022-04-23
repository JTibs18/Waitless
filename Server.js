const http = require('http');
const app = require('./backend/app');

const server = http.createServer(app);
const port = process.env.PORT || 3000;

app.set('port', port);
server.listen(port);

var io = require('socket.io')(server, {
  cors: {
  origin: "http://localhost:4200",
  methods: ["GET", "POST"]
}
});

console.log("Server listening at http://localhost:3000");

io.on('connection', (socket) => {
  console.log('connected');

  socket.on('order', (order) => {
    io.emit('order', order);
  });

  socket.on('rec', (rec) => {
    io.emit('rec', rec);
  });

  socket.on('disconnect', () => {
    console.log('disconnected!');
  });
});
