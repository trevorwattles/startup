import React, { useState } from "react";

export function JokeGenerator({ onJokeGenerated }) {
  const [joke, setJoke] = useState("");

  const getUserName = () => {
    const email = localStorage.getItem("userName") || "Mystery User";
    return email.includes("@") ? email.split("@")[0] : email;
  };

  const saveJoke = (newJoke) => {
    const username = getUserName();
    fetch("http://localhost:4000/joke", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, joke: newJoke }),
    })
      .then((response) => {
        if (response.status === 204 || response.headers.get("Content-Length") === "0") {
          return {}; // Return an empty object if there's no content.
        }
        return response.json();
      })
      .then((data) => {
        // Optionally handle the response data.
      })
      .catch((error) => console.error("Error posting joke:", error));
  };

  const generateJoke = () => {
    // Fetch a joke from the third-party API.
    fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const jokeText = data.joke;
        setJoke(jokeText);
        onJokeGenerated(jokeText);
        saveJoke(jokeText);
      })
      .catch((error) => console.error("Error fetching joke:", error));
  };

  return (
    <div>
      <button onClick={generateJoke}>Generate Joke</button>
      <p style={{ opacity: joke ? 1 : 0, border: joke ? "2px solid #ffcc00" : "none" }}>
        {joke}
      </p>
    </div>
  );
}
