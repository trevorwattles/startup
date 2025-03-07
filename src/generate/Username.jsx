import React, { useEffect, useState } from "react";

export function Username() {
  const getUserName = () => {
    const email = localStorage.getItem("userName") || "Mystery User";
    return email.includes("@") ? email.split("@")[0] : email;
  };

  const [username, setUsername] = useState(getUserName());

  useEffect(() => {
    setUsername(getUserName());
  }, []);

  return <h1>Welcome, {username}</h1>;
}
