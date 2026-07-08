import React, { useEffect, useState } from "react";
import "./ThemeToggle.css";

import useGsapReveal from "../../../hooks/useGsapReveal";
function GithubStats() {
  useGsapReveal('.github-stats-section');
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://api.github.com/users/Laiba-Afzal-Code")
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);

  return (
    <section className="github-stats-section">
      <h2 className="section-title">GitHub Stats</h2>

      {data && (
        <div className="github-stats">
          <p>Repos: {data.public_repos}</p>
          <p>Followers: {data.followers}</p>
          <p>Following: {data.following}</p>
        </div>
      )}
    </section>
  );
}

export default GithubStats;