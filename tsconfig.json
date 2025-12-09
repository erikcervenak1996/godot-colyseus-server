import { Room, Client } from "colyseus";

export interface Player {
  id: string;
  name: string;
  character: string;
  x: number;
  y: number;
  z: number;
}

export class GameRoom extends Room {
  players: Map<string, Player> = new Map();

  onCreate(options: any) {
    console.log("GameRoom created!");
    
    this.onMessage("join_game", (client, data) => {
      const player: Player = {
        id: client.sessionId,
        name: data.name,
        character: data.character,
        x: 0,
        y: 1,
        z: 0
      };
      
      this.players.set(client.sessionId, player);
      
      // Send to all clients
      this.broadcast("player_joined", player);
      
      // Send existing players to new client
      client.send("existing_players", Array.from(this.players.values()));
      
      console.log(`Player joined: ${data.name} (${data.character})`);
    });

    this.onMessage("update_position", (client, data) => {
      const player = this.players.get(client.sessionId);
      if (player) {
        player.x = data.position.x;
        player.y = data.position.y;
        player.z = data.position.z;
        
        this.broadcast("player_moved", {
          id: client.sessionId,
          position: data.position,
          rotation: data.rotation
        }, { except: client });
      }
    });
  }

  onJoin(client: Client, options: any) {
    console.log(`Client ${client.sessionId} joined`);
  }

  onLeave(client: Client, consented: boolean) {
    console.log(`Client ${client.sessionId} left`);
    this.players.delete(client.sessionId);
    this.broadcast("player_left", client.sessionId);
  }

  onDispose() {
    console.log("GameRoom disposed");
  }
}