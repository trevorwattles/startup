import React, { useState } from "react";

export function RecentlySaved({ savedJokes, onSaveJoke }) {
  return (
    <div>
      <h3>Saved Jokes from Users</h3>
      <ul className="notification">
        {savedJokes.map((entry, index) => (
          <li key={index} className="user-name">
            {entry.username} saved "{entry.joke}"
          </li>
        ))}
      </ul>
      {onSaveJoke && (
        <button onClick={onSaveJoke} className="save-button">
          Save Joke
        </button>
      )}
    </div>
  );
}
