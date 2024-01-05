import React, { useState } from "react";
import axios from "axios";
import './GithubCard.css'


const GitHubCard = ({ userData }) => {
  return (
    <div className="card">
      <img src={userData.avatar_url} alt="Avatar" />
      <div>
        <h2> {userData.name}</h2>
        <p>Name: {userData.login}</p>
        <p>Public Repos: {userData.public_repos}</p>
        <p>Public Gits: {userData.public_gists}</p>
        <p>
          Joined GitHub on: {new Date(userData.created_at).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

const App = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}`
      );
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div className="Wrapper">
      <div className="ctn-wrapper">
        <div className="child-wrapper">
          <h1>GitHub Cards</h1>
          <p>Card for your GitHub profile, card for your GitHub repositories.</p>
          <div className="border-style"></div>
          <form className="from-style" onSubmit={handleFormSubmit}>
            <label>
            
              <input
                type="text"
                value={username}
                placeholder="Enter your Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <button type="submit">Submit</button>
          </form>

          {userData && <GitHubCard userData={userData} />}
        </div>
      </div>
    </div>
  );
};

export default App;
