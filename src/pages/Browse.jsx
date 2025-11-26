import { useState, useMemo } from "react";
import styles from "./Browse.module.css";
import { BookOpen, Search, ChevronRight, Loader2 } from "lucide-react";
import BookCard from "../books/BookCard";
import { useQuery } from "@tanstack/react-query";
import { searchBooks } from "../services/api";

const CATEGORIES = [
  { name: "Fantasy", query: "fantasy" },
  { name: "Science Fiction", query: "science fiction" },
  { name: "Mystery & Thriller", query: "mystery" },
  { name: "Romance", query: "romance" },
  { name: "Classics", query: "classics" },
  { name: "Literature", query: "literature" },
];

function Browse() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState({});

  // Fetch books for each category
  const categoryQueries = CATEGORIES.map(category => {
    return useQuery({
      queryKey: ["category", category.query],
      queryFn: async () => {
        const result = await searchBooks(category.query, 18, 0);
        // searchBooks returns { books: [...], total: ... }
        const books = result?.books || [];
        const divisibleCount = Math.floor(books.length / 6) * 6;
        return books.slice(0, divisibleCount);
      },
      enabled: !searchQuery.trim(),
    });
  });

  // Search query results
  const { data: searchResults, isLoading: isSearching } = useQuery({
    queryKey: ["searchBooks", searchQuery],
    queryFn: async () => {
      const result = await searchBooks(searchQuery, 48, 0);
      // searchBooks returns { books: [...], total: ... }
      const books = result?.books || [];
      const divisibleCount = Math.floor(books.length / 6) * 6;
      return books.slice(0, divisibleCount);
    },
    enabled: searchQuery.trim().length > 0,
  });

  const toggleCategory = (categoryName) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  const isLoadingCategories = categoryQueries.some(q => q.isLoading);

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

      {/* Search */}
      <div className={styles.filters}>
        <div className={styles.filtersContent}>
          <div className={styles.searchContainer}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search by title, author, or genre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={styles.booksSection}>
        {/* Search Results */}
        {searchQuery.trim() && (
          <div className={styles.searchResultsSection}>
            <div className={styles.sectionHeader}>
              <h2>Search Results</h2>
              {!isSearching && searchResults && (
                <p className={styles.searchInfo}>
                  {searchResults.length} {searchResults.length === 1 ? "book" : "books"} found for "{searchQuery}"
                </p>
              )}
            </div>

            {isSearching ? (
              <div className={styles.loadingContainer}>
                <Loader2 size={48} className="animate-spin" style={{ color: '#6b1830' }} />
                <p>Searching...</p>
              </div>
            ) : searchResults && searchResults.length > 0 ? (
              <div className={styles.grid}>
                {searchResults.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <div className={styles.noResults}>
                <Search className={styles.noResultsIcon} />
                <h3>No books found</h3>
                <p>Try a different search term</p>
              </div>
            )}
          </div>
        )}

        {/* Category Sections */}
        {!searchQuery.trim() && (
          <>
            {isLoadingCategories ? (
              <div className={styles.loadingContainer}>
                <Loader2 size={48} className="animate-spin" style={{ color: '#6b1830' }} />
                <p>Loading categories...</p>
              </div>
            ) : (
              CATEGORIES.map((category, index) => {
                const books = categoryQueries[index]?.data || [];
                const isExpanded = expandedCategories[category.name];
                const displayBooks = isExpanded ? books : books.slice(0, 6);

                if (books.length === 0) return null;

                return (
                  <div key={category.name} className={styles.categorySection}>
                    <div className={styles.categoryHeader}>
                      <h2>{category.name}</h2>
                      {books.length > 6 && (
                        <button
                          className={styles.viewMoreButton}
                          onClick={() => toggleCategory(category.name)}
                        >
                          {isExpanded ? "Show Less" : "View All"}
                          <ChevronRight
                            size={20}
                            className={isExpanded ? styles.chevronUp : styles.chevronRight}
                          />
                        </button>
                      )}
                    </div>
                    <div className={styles.grid}>
                      {displayBooks.map((book) => (
                        <BookCard key={book.id} book={book} />
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Browse;
