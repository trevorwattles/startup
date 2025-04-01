// jokeSocket.js

const JokeEvent = {
    Save: "jokeSave",
    System: "system",
  };
  
  class JokeMessage {
    constructor(from, type, payload) {
      this.from = from;
      this.type = type;
      this.payload = payload;
    }
  }
  
  class JokeNotifier {
    events = [];
    handlers = [];
  
    constructor() {
      const protocol = window.location.protocol === "https:" ? "wss" : "ws";
      const port = window.location.port;
      this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}`);
  
      this.socket.onopen = () => {
        this.receiveJoke(new JokeMessage("JokeApp", JokeEvent.System, { msg: "connected" }));
      };
  
      this.socket.onclose = () => {
        this.receiveJoke(new JokeMessage("JokeApp", JokeEvent.System, { msg: "disconnected" }));
        setTimeout(() => new JokeNotifier(), 1000); // Optional: attempt reconnect
      };
  
      this.socket.onmessage = async (msg) => {
        try {
          const event = JSON.parse(await msg.data.text());
          this.receiveJoke(event);
        } catch (err) {
          console.error("Failed to parse WebSocket message:", err);
        }
      };
    }
  
    broadcastJoke(from, payload) {
      const event = new JokeMessage(from, JokeEvent.Save, payload);
      this.socket.send(JSON.stringify(event));
    }
  
    addHandler(handler) {
      this.handlers.push(handler);
    }
  
    removeHandler(handler) {
      this.handlers = this.handlers.filter((h) => h !== handler);
    }
  
    receiveJoke(event) {
      this.events.push(event);
  
      if (event.type === JokeEvent.Save) {
        this.handlers.forEach((handler) => handler(event.payload));
      }
    }
  }
  
  const JokeWebSocket = new JokeNotifier();
  
  export { JokeWebSocket, JokeEvent };
  