const Express = require('express')();
const Http = require('http').Server(Express);
const io = require('socket.io')(Http, {
  cors: {
    origins: [],
    methods: ['GET', 'POST'],
  },
});

const fs = require('fs');
const questionsData = require('./quiz-questions.json'); // Replace with your JSON file path if necessary

// Store the players in a room
const players = new Map();
const maxPlayers = 5;
// Create a 20x50 array filled with the value 5
const numRows = 20;
const numCols = 50;
const filledValue = -1;

const GameMap = [];

for (let i = 0; i < numRows; i++) {
  const row = new Array(numCols).fill(filledValue);
  GameMap.push(row);
}

// console.log(GameMap);
//Game map
let objectTypes = {
  farm: 0,
  goldMine: 1,
  building: 2,
  docks: 3,
  // Add more types as needed
};

// Place objects randomly in n locations
let count = 0;
while (count < 300) {
  let randomRow = Math.floor(Math.random() * numRows);
  let randomCol = Math.floor(Math.random() * numCols);

  if (GameMap[randomRow][randomCol] === -1) {
    // Generate a random object type index from 0 to number of types - 1
    let randomTypeIndex = Math.floor(Math.random() * Object.keys(objectTypes).length);

    // Assign the object type to the location
    GameMap[randomRow][randomCol] = randomTypeIndex;

    count++;
  }
}

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
      // Send the 20x50 array to the client who just joined
      socket.emit('Joined', GameMap);
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
    GameMap[i][j] = val;
    console.log('Received change event:', room, i, j, val);
    io.to(room).emit('changed', i, j, val);
  });

});

Http.listen(3000, () => {
  console.log('Listening at Port :3000...');
});

