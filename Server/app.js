const Express = require('express')();
const Http = require('http').Server(Express);
const io = require('socket.io')(Http, {
  cors: {
    origins: ['http://192.168.100.5:4200', 'http://192.168.0.5:4200'],
    methods: ['GET', 'POST'],
  },
});
// Store the players in a room
const players = new Map();
const maxPlayers = 5;

io.on('connection', (socket) => {
  console.log('A user connected '+ socket.id);
  // Join a room
  socket.on('join', (room) => {
    if (!players.has(room) || players.get(room).length < maxPlayers) {
      socket.join(room);

      // Store player information
      if (!players.has(room)) {
        players.set(room, []);
      }
      players.get(room).push(socket.id);
      console.log(players.get(room).length); 
      // Emit event to the room
      io.to(room).emit('playerJoined', socket.id);

      console.log(`${socket.id} joined room ${room}`);
    } else {
      socket.emit('roomFull');
      console.log(`Room ${room} is full`);
    }
  });

  // Handle player disconnect
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  
    // Find the room the player is in
    const foundEntry = [...players.entries()].find(([room, players]) =>
    players.includes(socket.id)
    );
    const room = foundEntry ? foundEntry[0] : null;

    console.log('Room name for socket ID:', room);

    if (room=='myRoom') {
      // Remove player from the room
      const index = players.get(room).indexOf(socket.id);
      if (index !== -1) {
        players.get(room).splice(index, 1);
        io.to(room).emit('playerLeft', socket.id);
      }

      // Remove room if no players left
      if (players.get(room).length === 0) {
        players.delete(room);
      }

      console.log(`${socket.id} left room ${room}`);
    }
  });

  socket.on("change", (room, i, j, val) => {
    console.log('Received change event:', room, i, j, val);
    io.to(room).emit('changed', i, j, val);
  });

});

Http.listen(3000, () => {
  console.log('Listening at Port :3000...');
});

