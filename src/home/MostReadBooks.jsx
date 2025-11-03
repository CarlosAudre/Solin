import styles from "./MostReadBooks.module.css";

function MostReadBooks({ books = [], userBooks = [] }) {
    if (!books.length) return null;

    const bookStats = books.map(book => {
        const interactions = userBooks.filter(ub => ub.book_id === book.id).length;
        return { ...book, interactions };
    });

    const topBooks = bookStats
        .sort((a, b) => b.interactions - a.interactions)
        .slice(0, 5);

    if (topBooks.length === 0) return null;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.iconBox}>
                    <span className={styles.trendingIcon}>📈</span>
                </div>
                <h2 className={styles.title}>Top 5 Most Read Books</h2>
            </div>

            <div className={styles.bookList}>
                {topBooks.map((book, index) => {
                    const userBook = userBooks.find(ub => ub.book_id === book.id);
                    return (
                        <div key={book.id} className={styles.bookCard}>
                            <div
                                className={`${styles.rankBadge} ${index === 0 ? styles.rankBadgeTop : ""
                                    }`}
                            >
                                {index === 0 ? "👑" : index + 1}
                            </div>

                            <div className={styles.coverBox}>
                                <img src={book.cover_url} alt={book.title} />
                            </div>

                            <div className={styles.bookInfo}>
                                <h3>{book.title}</h3>
                                <p>{book.author}</p>
                                <div className={styles.tags}>
                                    <span className={styles.genre}>{book.genre}</span>
                                    {userBook?.is_favorite && (
                                        <span className={styles.favorite}>❤️ Favorite</span>
                                    )}
                                </div>
                            </div>

                            <div className={styles.readerCount}>
                                <p className={styles.readersNumber}>{book.interactions}</p>
                                <p className={styles.readersText}>readers</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default MostReadBooks;
