// App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // Optional: For basic styling

const BASE_URL = "https://api.sampleapis.com/movies/comedy";

const App = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Fetch popular movies from TMDb
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${BASE_URL}`
        );
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="movie-list">
      <div className="movies">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={`${movie.posterURL}`}
              alt={movie.title}
              className="movie-image"
            />
            <h2 className="movie-title">{movie.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
