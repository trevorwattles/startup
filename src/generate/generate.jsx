import React, { useState, useEffect } from "react";
import { Username } from "./username";
import { JokeGenerator } from "./jokeGenerator";
import { RecentlySaved } from "./recentlySaved";

export function Generate() {
  const getUserName = () => {
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
  const [username, setUsername] = useState(getUserName());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setUsername(getUserName());
  }, []);

  const randomUsers = ["Emily", "Michael", "David", "Jessica", "Daniel"];
  const randomJokes = [
    "Why don’t skeletons fight each other? They don’t have the guts.",
    "I told my wife she was drawing her eyebrows too high. She looked surprised.",
    "Why don’t eggs tell jokes? They might crack up.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const newJoke = {
        username: randomUsers[Math.floor(Math.random() * randomUsers.length)],
        joke: randomJokes[Math.floor(Math.random() * randomJokes.length)],
      };

      setSavedJokes((prevJokes) => {
        const updatedJokes = [newJoke, ...prevJokes];
        return updatedJokes.length > 5 ? updatedJokes.slice(0, 5) : updatedJokes;
      });

      setEvents((prevEvents) => {
        let newEvents = [newJoke, ...prevEvents];
        return newEvents.length > 10 ? newEvents.slice(0, 10) : newEvents;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleJokeGenerated = (joke) => {
    setCurrentJoke(joke);
    setShowSaveButton(true);
  };

  const handleSaveJoke = () => {
    if (currentJoke) {
      setSavedJokes((prevJokes) => {
        const updatedJokes = [{ username, joke: currentJoke }, ...prevJokes];
        return updatedJokes.length > 5 ? updatedJokes.slice(0, 5) : updatedJokes;
      });
      setShowSaveButton(false);
    }
  };

  function createMessageArray() {
    return events.map((event, i) => (
      <div key={i} className='event'>
        <span className={'player-event'}>{event.username}</span> {event.joke}
      </div>
    ));
  }

  return (
    <main>
      <h1>Welcome, {username}</h1>
      <JokeGenerator onJokeGenerated={handleJokeGenerated} />
      {showSaveButton && <button onClick={handleSaveJoke}>Save Joke</button>}
      <RecentlySaved savedJokes={savedJokes} />
      <div id='player-messages'>{createMessageArray()}</div>
    </main>
  );
}
