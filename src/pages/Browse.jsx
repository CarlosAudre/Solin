import { useState, useEffect } from "react";
import styles from "./Browse.module.css";
import { booksMock } from "../mocks/booksMock";
import { BookOpen, Search, Filter } from "lucide-react";
import BookCard from "../books/BookCard";

const GENRES = [
  "All",
  "Fiction",
  "Non-Fiction",
  "Mystery",
  "Thriller",
  "Romance",
  "Science Fiction",
  "Fantasy",
  "Historical",
  "Biography",
  "Self-Help",
  "Poetry",
  "Horror",
  "Adventure",
  "Literary Fiction",
];

function Browse() {
  const [books, setBooks] = useState([]);
  const [userBooks, setUserBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");

  useEffect(() => {
    setBooks(booksMock);
  }, []);

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === "All" || book.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerTitle}>
            <BookOpen className={styles.icon} />
            <h1>Browse Books</h1>
          </div>
          <p>Discover your next great read from our carefully curated collection</p>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.filtersContent}>
          <div className={styles.searchContainer}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search by title or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.genreSelect}>
            <Filter className={styles.filterIcon} />
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className={styles.select}
            >
              {GENRES.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Books */}
      <div className={styles.booksSection}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>{selectedGenre === "All" ? "All Books" : selectedGenre}</h2>
            <p>
              {filteredBooks.length}{" "}
              {filteredBooks.length === 1 ? "book" : "books"} found
            </p>
          </div>

          {searchQuery && (
            <div className={styles.searchInfo}>
              Searching for: <span>"{searchQuery}"</span>
            </div>
          )}
        </div>

        {filteredBooks.length > 0 ? (
          <div className={styles.grid}>
            {filteredBooks.map((book) => {
              const userBook = userBooks.find((ub) => ub.book_id === book.id);
              return <BookCard key={book.id} book={book} userBook={userBook} />;
            })}
          </div>
        ) : (
          <div className={styles.noResults}>
            <Search className={styles.noResultsIcon} />
            <h3>No books found</h3>
            <p>Try adjusting your search or filters</p>
            {(searchQuery || selectedGenre !== "All") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedGenre("All");
                }}
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Browse;
