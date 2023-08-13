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
const maxPlayers = 4;
// Create a 20x50 array filled with the value 5
const numRows = 50;
const numCols = 50;
const filledValue = 0;

const GameMap = [];

for (let i = 0; i < numRows; i++) {
  const row = new Array(numCols).fill(filledValue);
  GameMap.push(row);
}

// console.log(GameMap);
//Game map
let objectTypes = {
  empty: 0,
  townCentre: 1,
  hospital: 2,
  university: 3,
  church: 4,
  market: 5,
  dock: 6,
  lumberCamp: 7,
  farm: 8,
  miningCamp: 9,
  factory: 10,
  goldrock: 11,
  pond: 12,
  forest: 13,
  settlement: 14,
  // Add more types as needed
};

forestCount = Math.floor(0.015*numRows*numCols);
pondCount = Math.floor(0.015*numRows*numCols);
goldRockCount = Math.floor(0.04*numRows*numCols);
settlementCount = maxPlayers*4
townCentreCount = maxPlayers


// functions for resource generation in the map
function generateTownCentre() {
  GameMap[3][3] = objectTypes.townCentre
  GameMap[numRows-4][3] = objectTypes.townCentre
  GameMap[3][numCols-4] = objectTypes.townCentre
  GameMap[numRows-4][numCols-4] = objectTypes.townCentre
}

function generateForest() {
  let count = 0;
  while (count < forestCount) {
    let randomRow = Math.floor(Math.random() * numRows-1);
    let randomCol = Math.floor(Math.random() * numCols-1);
    if (randomRow >= 0 && randomRow < GameMap.length &&
      randomCol >= 0 && randomCol < GameMap[randomRow].length) {
      if (GameMap[randomRow][randomCol] === filledValue && 
      GameMap[randomRow+1][randomCol] === filledValue && 
      GameMap[randomRow][randomCol+1] === filledValue && 
      GameMap[randomRow+1][randomCol+1] === filledValue ) {
        GameMap[randomRow][randomCol] = objectTypes.forest;
        GameMap[randomRow+1][randomCol] = objectTypes.forest;
        GameMap[randomRow][randomCol+1] = objectTypes.forest;
        GameMap[randomRow+1][randomCol+1] = objectTypes.forest;
        count++;
      }
    }
  }
}

function generatePond() {
  let count = 0;
  while (count < pondCount) {
    let randomRow = Math.floor(Math.random() * numRows-1);
    let randomCol = Math.floor(Math.random() * numCols-1);
    if (randomRow >= 0 && randomRow < GameMap.length &&
      randomCol >= 0 && randomCol < GameMap[randomRow].length) {
      if (GameMap[randomRow][randomCol] === filledValue && 
      GameMap[randomRow+1][randomCol] === filledValue && 
      GameMap[randomRow][randomCol+1] === filledValue && 
      GameMap[randomRow+1][randomCol+1] === filledValue ) {
        GameMap[randomRow][randomCol] = objectTypes.pond;
        GameMap[randomRow+1][randomCol] = objectTypes.pond;
        GameMap[randomRow][randomCol+1] = objectTypes.pond;
        GameMap[randomRow+1][randomCol+1] = objectTypes.pond;
        count++;
      }
    }
  }
}

function generateGoldRock() {
  let count = 0;
  while (count < goldRockCount) {
    let randomRow = Math.floor(Math.random() * numRows);
    let randomCol = Math.floor(Math.random() * numCols);
    if (randomRow >= 0 && randomRow < GameMap.length &&
      randomCol >= 0 && randomCol < GameMap[randomRow].length) {
      if (GameMap[randomRow][randomCol] === filledValue) {
        GameMap[randomRow][randomCol] = objectTypes.goldrock;
        count++;
      }
    }
  }
}

function generateSettlement() {
  let count = 0;
  let maxAttempts = 1000; // Maximum attempts to find a suitable location

  while (count < settlementCount && maxAttempts > 0) {
    let randomRow = Math.floor(Math.random() * numRows);
    let randomCol = Math.floor(Math.random() * numCols);

    if (GameMap[randomRow][randomCol] === filledValue) {
      // Check the surrounding area for existing settlements before placing
      let isValidLocation = true;
      let radius = 5; // Adjust the radius as needed

      for (let rowOffset = -radius; rowOffset <= radius; rowOffset++) {
        for (let colOffset = -radius; colOffset <= radius; colOffset++) {
          let checkRow = randomRow + rowOffset;
          let checkCol = randomCol + colOffset;

          if (
            checkRow >= 0 &&
            checkRow < numRows &&
            checkCol >= 0 &&
            checkCol < numCols &&
            GameMap[checkRow][checkCol] === objectTypes.settlement
          ) {
            isValidLocation = false;
            break;
          }
        }

        if (!isValidLocation) {
          break;
        }
      }

      if (isValidLocation) {
        GameMap[randomRow][randomCol] = objectTypes.settlement;
        count++;
      }
    }

    maxAttempts--;
  }
}

generateTownCentre()
generateForest();
generatePond();
generateGoldRock();
generateSettlement();
// // Place objects randomly in n locations
// let count = 0;
// while (count < 300) {
//   let randomRow = Math.floor(Math.random() * numRows);
//   let randomCol = Math.floor(Math.random() * numCols);

//   if (GameMap[randomRow][randomCol] === filledValue) {
//     // Generate a random object type index from 0 to number of types - 1
//     let randomTypeIndex = Math.floor(Math.random() * Object.keys(objectTypes).length);

//     // Assign the object type to the location
//     GameMap[randomRow][randomCol] = randomTypeIndex;

//     count++;
//   }
// }

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
  
  socket.on("getQuestion", () => {
    // Get a random question from the questionsData
    const randomQuestionIndex = Math.floor(Math.random() * questionsData.length);
    const randomQuestion = questionsData[randomQuestionIndex];
    console.log(randomQuestion);
    io.emit('returnQuestion', randomQuestion);
  })
});

Http.listen(3000, () => {
  console.log('Listening at Port :3000...');
});

