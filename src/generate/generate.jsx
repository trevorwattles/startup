import React, { useState, useEffect } from "react";
import { Username } from "./username";
import { JokeGenerator } from "./jokeGenerator";
import { RecentlySaved } from "./recentlySaved";

export function Generate() {
  const getFormattedUserName = () => {
    const email = localStorage.getItem("userName") || "Mystery User";
    return email.includes("@") ? email.split("@")[0] : email;
  };

  const [savedJokes, setSavedJokes] = useState([
    { username: "Sarah", joke: "I told my suitcase there'd be no vacations… now it’s emotional baggage." },
    { username: "Ashley", joke: "Parallel lines have so much in common. Too bad they’ll never meet." },
    { username: "James", joke: "Why did the scarecrow win an award? He was outstanding in his field." },
  ]);
  const [currentJoke, setCurrentJoke] = useState("");
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setSavedJokes((prevJokes) => prevJokes.map(joke => ({ ...joke, username: getFormattedUserName() })));
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
