import React, { useState } from "react";

export function JokeGenerator({ onJokeGenerated }) {
  const [joke, setJoke] = useState("");

  const getUserName = () => {
    const email = localStorage.getItem("userName") || "Mystery User";
    return email.includes("@") ? email.split("@")[0] : email;
  };

  async function saveJoke(newJoke) {
    const username = getUserName();
    await fetch("/api/joke", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username, joke: newJoke }),
    })
     
  };

  const generateJoke = () => {
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
        //saveJoke(jokeText);
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
