import React, { useState, useEffect } from "react";
import { Username } from "./Username";
import { JokeGenerator } from "./JokeGenerator";
import { RecentlySaved } from "./RecentlySaved";

export function Generate() {
  const getFormattedUserName = () => {
    const email = localStorage.getItem("userName") || "Mystery User";
    return email.includes("@") ? email.split("@")[0] : email;
  };

  const initialJokes = [
    { username: "Sarah", joke: "I told my suitcase there'd be no vacations… now it’s emotional baggage." },
    { username: "Ashley", joke: "Parallel lines have so much in common. Too bad they’ll never meet." },
    { username: "James", joke: "Why did the scarecrow win an award? He was outstanding in his field." },
  ];

  const [savedJokes, setSavedJokes] = useState([]);
  const [currentJoke, setCurrentJoke] = useState("");
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomJoke = initialJokes[Math.floor(Math.random() * initialJokes.length)];
      setSavedJokes((prevJokes) => {
        const updatedJokes = [randomJoke, ...prevJokes];
        return updatedJokes.length > 5 ? updatedJokes.slice(0, 5) : updatedJokes;
      });
    }, 4000); 

    return () => clearInterval(interval);
  }, []);

  const handleJokeGenerated = (joke) => {
    setCurrentJoke(joke);
    setShowSaveButton(true);
  };

  const handleSaveJoke = () => {
    if (currentJoke) {
      setSavedJokes((prevJokes) => {
        const updatedJokes = [{ username: getFormattedUserName(), joke: currentJoke }, ...prevJokes];
        return updatedJokes.length > 5 ? updatedJokes.slice(0, 5) : updatedJokes;
      });
      setShowSaveButton(false);
    }
  };

  function createMessageArray() {
    return events.map((event, i) => (
      <div key={i} className="event">
        <span className={"player-event"}>{event.username}</span> {event.joke}
      </div>
    ));
  }

  return (
    <main>
      <Username />
      <JokeGenerator onJokeGenerated={handleJokeGenerated} />
      {showSaveButton && <button onClick={handleSaveJoke}>Save Joke</button>}
      <RecentlySaved savedJokes={savedJokes} />
      <div id="player-messages">{createMessageArray()}</div>
    </main>
  );
}
