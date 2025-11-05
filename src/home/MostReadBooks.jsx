import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import styles from "./MostReadBooks.module.css";

function MostReadBooks({ books = [], userBooks = [] }) {
    if (!books.length) return null;

    const bookStats = books.map((book) => {
        const interactions = userBooks.filter((ub) => ub.book_id === book.id).length;
        return { ...book, interactions };
    });

    const topBooks = bookStats
        .sort((a, b) => b.interactions - a.interactions)
        .slice(0, 5);

    if (topBooks.length === 0) return null;

    const getPositionColor = (pos) => {
        if (pos === 1) return styles.rank1;
        if (pos === 2) return styles.rank2;
        if (pos === 3) return styles.rank3;
        return styles.rankDefault;
    };

    return (
        <div className={styles.container}>
            {/* Gradientes decorativos */}
            <div className={styles.gradientTopRight}></div>
            <div className={styles.gradientBottomLeft}></div>

            <div className={styles.inner}>
                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.iconBox}>
                        <span className={styles.trendingIcon}>📈</span>
                        <span className={styles.crownBadge}>👑</span>
                    </div>
                    <div>
                        <h2 className={styles.title}>Most Read Books</h2>
                        <p className={styles.subtitle}>Our readers' top picks</p>
                    </div>
                </div>

                {/* Lista de livros */}
                <div className={styles.bookGrid}>
                    {topBooks.map((book, index) => {
                        const position = index + 1;
                        return (
                            <motion.div
                                key={book.id}                           
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={styles.bookCard}
                            >
                                <Link to={`/books/${book.id}`} className={styles.bookLink}>
                                    {/* Medalha de posição */}
                                    <div className={`${styles.rankBadge} ${getPositionColor(position)}`}>
                                        {position}
                                    </div>

                                    {/* Coroa no primeiro */}
                                    {position === 1 && <div className={styles.crownIcon}>👑</div>}

                                    {/* Capa */}
                                    <div className={styles.coverBox}>
                                        <img
                                            src={
                                                book.cover_url ||
                                                `https://source.unsplash.com/400x600/?book,${book.genre}`
                                            }
                                            alt={book.title}
                                        />
                                    </div>

                                    {/* Info */}
                                    <div className={styles.bookInfo}>
                                        <h3>{book.title}</h3>
                                        <p>{book.author}</p>
                                        <div className={styles.tags}>
                                            <span className={styles.genre}>{book.genre}</span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                <div className={styles.footer}>
                    <p>Based on reader activity and engagement</p>
                </div>
            </div>
        </div>
    );
}

export default MostReadBooks;
