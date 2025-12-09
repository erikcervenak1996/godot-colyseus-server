import { Server } from "colyseus";
import { createServer } from "http";
import express from "express";
import cors from "cors";
import { GameRoom } from "./rooms/GameRoom";

const port = Number(process.env.PORT) || 3000;
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