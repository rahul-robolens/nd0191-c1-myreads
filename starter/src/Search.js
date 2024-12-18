import React, { useState } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";

function Search({ onSearch, searchResults, onShelfChange}) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search by title, author, or ISBN"
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchResults.length > 0 &&
            searchResults.map((book) => (
              <li key={book.id}>
                <Book book={book} onShelfChange={onShelfChange} />
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
}

export default Search;