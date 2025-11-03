import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BookCard from "../books/BookCard";
import styles from "./Explore.module.css";

const GENRES = [
  { value: "all", label: "All Books" },
  { value: "Fiction", label: "Fiction" },
  { value: "Fantasy", label: "Fantasy" },
  { value: "Mystery", label: "Mystery" },
  { value: "Thriller", label: "Thriller" },
  { value: "Romance", label: "Romance" },
  { value: "Science Fiction", label: "Sci-Fi" },
  { value: "Historical", label: "Historical" },
  { value: "Biography", label: "Biography" },
];

function Explore({ books, userBooks }) {
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  const handleGenreChange = (genre) => {
    if (genre === selectedGenre) return;

    setIsLoading(true);
    setSelectedGenre(genre);

    setTimeout(() => {
      setIsLoading(false);
      if (scrollRef.current) scrollRef.current.scrollLeft = 0;
    }, 400);
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 800;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const filteredBooks =
    selectedGenre === "all"
      ? books
      : books.filter((book) => book.genre === selectedGenre);

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Explore by Genre</h2>
        <p className={styles.subtitle}>
          Choose a genre and discover amazing books
        </p>
      </div>

      {/* Genre Buttons */}
      <div className={styles.genreContainer}>
        <div className={styles.genreList}>
          {GENRES.map((genre) => (
            <button
              key={genre.value}
              onClick={() => handleGenreChange(genre.value)}
              className={`${styles.genreButton} ${
                selectedGenre === genre.value ? styles.activeGenre : ""
              }`}
            >
              {genre.label}
            </button>
          ))}
        </div>
      </div>

      {/* Books Section */}
      <div className={styles.carouselWrapper}>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.loading}
            >
              <Loader2 className={styles.loaderIcon} />
              <p>Loading books...</p>
            </motion.div>
          ) : filteredBooks.length > 0 ? (
            <motion.div
              key={selectedGenre}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className={styles.carousel}
            >
              {/* Scroll buttons */}
              <button
                className={`${styles.scrollButton} ${styles.leftButton}`}
                onClick={() => scroll("left")}
              >
                <ChevronLeft size={20} />
              </button>

              <button
                className={`${styles.scrollButton} ${styles.rightButton}`}
                onClick={() => scroll("right")}
              >
                <ChevronRight size={20} />
              </button>

              {/* Books */}
              <div ref={scrollRef} className={styles.booksRow}>
                {filteredBooks.map((book, index) => {
                  const userBook = userBooks.find(
                    (ub) => ub.book_id === book.id
                  );
                  return (
                    <motion.div
                      key={book.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      className={styles.bookWrapper}
                    >
                      <BookCard book={book} userBook={userBook} />
                    </motion.div>
                  );
                })}
              </div>

              {/* Book count */}
              <div className={styles.bookCount}>
                Showing {filteredBooks.length}{" "}
                {filteredBooks.length === 1 ? "book" : "books"}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.empty}
            >
              <div className={styles.emptyIcon}>📚</div>
              <h3>No books found</h3>
              <p>Try selecting a different genre</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Explore;
