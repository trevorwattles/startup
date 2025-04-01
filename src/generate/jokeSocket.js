// jokeSocket.js

let socket;
let onJokeReceivedCallback = null;

export function connectWebSocket() {
  socket = new WebSocket(`ws://${window.location.host}`);

  socket.onopen = () => {
    console.log("WebSocket connection established");
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    // Broadcast received joke to subscribed handler
    if (onJokeReceivedCallback && data.type === "joke") {
      onJokeReceivedCallback(data.payload);
    }
  };

  socket.onclose = () => {
    console.log("WebSocket connection closed. Attempting to reconnect...");
    setTimeout(connectWebSocket, 1000);
  };
}

export function sendJoke(jokeObj) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({ type: "joke", payload: jokeObj }));
  }
}

export function onJokeReceived(callback) {
  onJokeReceivedCallback = callback;
}
