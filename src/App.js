// App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // Optional: For basic styling

const BASE_URL = "https://api.sampleapis.com/movies";

const CATEGORIES = [
  "action-adventure",
  "animation",
  "classic",
  "comedy",
  "drama",
  "horror",
  "family",
  "mystery",
  "scifi-fantasy",
  "western"
];

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("comedy"); // Default category is "comedy"

  useEffect(() => {
    // Fetch movies based on the selected category
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/${selectedCategory}`);
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [selectedCategory]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="movie-list">
      <div className="controls">
        {/* Category Dropdown */}
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="category-select"
        >
          {CATEGORIES.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      <div className="movies">
        {filteredMovies.map((movie) => (
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
