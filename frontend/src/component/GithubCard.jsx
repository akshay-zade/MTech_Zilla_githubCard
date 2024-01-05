// Install axios for making HTTP requests: npm install axios
import React, { useState } from 'react';
import axios from 'axios';

const GitHubCard = ({ userData }) => {
  return (
    <div className="card">
      <img src={userData.avatar_url} alt="Avatar" />
      <div>
        <h2>{userData.name}</h2>
        <p>{userData.login}</p>
        <p>Public Repos: {userData.public_repos}</p>
        <p>Public Gists: {userData.public_gists}</p>
        <p>Joined GitHub on: {new Date(userData.created_at).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

const App = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label>
          GitHub Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>

      {userData && <GitHubCard userData={userData} />}
    </div>
  );
};

export default App;
