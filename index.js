const { Server } = require("colyseus");
const { createServer } = require("http");
const express = require("express");
const cors = require("cors");
const { GameRoom } = require("./GameRoom");

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

const server = createServer(app);
const gameServer = new Server({
  server,
});

// Register room handlers
gameServer.define('game_room', GameRoom);

// Health check
app.get('/', (req, res) => {
  res.send('Colyseus Server is running!');
});

gameServer.listen(port);
console.log(`Colyseus server listening on port ${port}`);