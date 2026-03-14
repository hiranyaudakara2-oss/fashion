import io from "socket.io-client";

class SocketService {
  private socket: any = null;

  connect() {
    if (!this.socket) {
      this.socket = io();
      
      this.socket.on("connect", () => {
        console.log("Connected to WebSocket server");
      });

      this.socket.on("disconnect", () => {
        console.log("Disconnected from WebSocket server");
      });
    }
    return this.socket;
  }

  onContentUpdate(callback: (content: any) => void) {
    if (this.socket) {
      this.socket.on("content-update", callback);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export const socketService = new SocketService();
