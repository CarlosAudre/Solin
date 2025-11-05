import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Loader2, Compass, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BookCard from "../books/BookCard";
import styles from "./Explore.module.css";

const GENRES = [
  { value: "all", label: "All Books"},
  { value: "Fiction", label: "Fiction"},
  { value: "Fantasy", label: "Fantasy"},
  { value: "Mystery", label: "Mystery"},
  { value: "Thriller", label: "Thriller"},
  { value: "Romance", label: "Romance"},
  { value: "Science Fiction", label: "Sci-Fi"},
  { value: "Historical", label: "Historical"},
  { value: "Biography", label: "Biography"},
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
      {/* Gradientes decorativos */}
      <div className={styles.gradientTopRight}></div>
      <div className={styles.gradientBottomLeft}></div>

      <div className={styles.inner}>
        {/* Header Premium */}
        <div className={styles.header}>
          <div className={styles.headerBackground}>
            <div className={styles.gradientOrb1}></div>
            <div className={styles.gradientOrb2}></div>
          </div>
          <div className={styles.headerContent}>
            <div className={styles.iconWrapper}>
              <div className={styles.iconGlow}></div>
              <Compass size={28} className={styles.compassIcon} strokeWidth={2.5} />
            </div>
            <div className={styles.titleWrapper}>
              <h2 className={styles.title}>
                Explore by Genre
                <span className={styles.titleAccent}>Find Your Next Read</span>
              </h2>
              <p className={styles.subtitle}>Browse our collection by your favorite genres</p>
            </div>
          </div>
          
        </div>

        {/* Genre Buttons */}
        <div className={styles.genreContainer}>
          <div className={styles.genreList}>
            {GENRES.map((genre) => (
              <motion.button
                key={genre.value}
                onClick={() => handleGenreChange(genre.value)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`${styles.genreButton} ${
                  selectedGenre === genre.value ? styles.activeGenre : ""
                }`}
              >
                <span>{genre.label}</span>
              </motion.button>
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
                <div className={styles.loaderWrapper}>
                  <Loader2 className={styles.loaderIcon} />
                  <p className={styles.loadingText}>Loading books...</p>
                </div>
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
                  aria-label="Scroll left"
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  className={`${styles.scrollButton} ${styles.rightButton}`}
                  onClick={() => scroll("right")}
                  aria-label="Scroll right"
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
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={styles.empty}
              >
                <div className={styles.emptyIcon}>📚</div>
                <h3 className={styles.emptyTitle}>No books found</h3>
                <p className={styles.emptyText}>Try selecting a different genre</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default Explore;