import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { getAll, search, update } from "./BooksAPI";
import Search from "./Search";
import Bookshelf from "./Bookshelf";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]); 
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    getAll().then((books) => setBooks(books));
  }, []);

  const handleSearch = (query) => {
    if (query.trim()) {
      search(query).then((result) => {
        // Check if result is an array and not an error
        if (Array.isArray(result)) {
          // Map search results to include shelf information from existing books
          const updatedSearchResults = result.map(searchBook => {
            const existingBook = books.find(book => book.id === searchBook.id);
            return {
              ...searchBook,
              shelf: existingBook ? existingBook.shelf : 'none'
            };
          });
          setSearchResults(updatedSearchResults);
        } else {
          // Handle case where search returns an error or empty result
          setSearchResults([]);
        }
      }).catch(() => {
        // Handle any network or API errors
        setSearchResults([]);
      });
    } else {
      setSearchResults([]);
    }
  };

  const handleShelfChange = (book, shelf) => {
    update(book, shelf).then(() => {
      getAll().then((books) => {
        setBooks(books);
        
        // Update shelf in search results 
        const updatedSearchResults = searchResults.map(searchBook => 
          searchBook.id === book.id ? { ...searchBook, shelf } : searchBook
        );
        setSearchResults(updatedSearchResults);
      });
    });
  };

  return (
    <Router>
      <div className="app">
        <Route exact path="/">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <Bookshelf
                shelf="currentlyReading"
                books={books}
                onShelfChange={handleShelfChange}
              />
              <Bookshelf
                shelf="wantToRead"
                books={books}
                onShelfChange={handleShelfChange}
              />
              <Bookshelf
                shelf="read"
                books={books}
                onShelfChange={handleShelfChange}
              />
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        </Route>
        <Route path="/search">
          <Search
            query=""
            onSearch={handleSearch}
            searchResults={searchResults}
            onShelfChange={handleShelfChange}
            books={books}
          />
        </Route>
      </div>
    </Router>
  );
}

export default App;