import React from "react";
import Book from "./Book";

function Search({ query, onSearch, onClose, searchResults, onShelfChange }) {
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <a className="close-search" onClick={onClose}>
          Close
        </a>
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
                <Book 
                  book={{
                    ...book,
                    shelf: book.shelf || 'none'
                  }} 
                  onShelfChange={onShelfChange} 
                />
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
}

export default Search;