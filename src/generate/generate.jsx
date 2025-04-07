import React, { useState, useEffect } from "react";
import { Username } from "./Username";
import { JokeGenerator } from "./JokeGenerator";
import { RecentlySaved } from "./RecentlySaved";
import { JokeWebSocket } from "./jokeSocket"; 

export function Generate() {
  const getFormattedUserName = () => {
    const email = localStorage.getItem("userName") || "Mystery User";
    return email.includes("@") ? email.split("@")[0] : email;
  };

  const [savedJokes, setSavedJokes] = useState([]);
  const [currentJoke, setCurrentJoke] = useState("");
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [events, setEvents] = useState([]);

  // Fetch the recent jokes from your API endpoint on initial load
  useEffect(() => {
    async function fetchRecentJokes() {
      try {
        const response = await fetch('/api/recentJokes');
        if (response.ok) {
          const jokes = await response.json();
          setSavedJokes(jokes);
        } else {
          console.error('Failed to fetch recent jokes');
        }
      } catch (error) {
        console.error('Error fetching recent jokes:', error);
      }
    }
    fetchRecentJokes();
  }, []);

  useEffect(() => {
    JokeWebSocket.addHandler((jokeObj) => {
      setSavedJokes((prevJokes) => {
        const updatedJokes = [jokeObj, ...prevJokes];
        return updatedJokes.length > 5 ? updatedJokes.slice(0, 5) : updatedJokes;
      });
    });

    return () => {
      JokeWebSocket.removeHandler((jokeObj) => {});
    };
  }, []);

  const handleJokeGenerated = (joke) => {
    setCurrentJoke(joke);
    setShowSaveButton(true);
  };

  const handleSaveJoke = async () => {
    if (currentJoke) {
      const username = getFormattedUserName();
      const jokeObj = { username, joke: currentJoke };
  
      try {
        await fetch("/api/joke", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(jokeObj),
        });
  
        setSavedJokes((prevJokes) => {
          const updatedJokes = [jokeObj, ...prevJokes];
          return updatedJokes.length > 5 ? updatedJokes.slice(0, 5) : updatedJokes;
        });
  
        JokeWebSocket.broadcastJoke(username, jokeObj);
  
        setShowSaveButton(false);
      } catch (error) {
        console.error("Error saving joke:", error);
      }
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
