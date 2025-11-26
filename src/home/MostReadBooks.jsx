import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TrendingUp, Crown, Eye, Loader2 } from "lucide-react";
import BookCoverImage from "../components/BookCoverImage";
import styles from "./MostReadBooks.module.css";

function MostReadBooks({ books = [], isLoading = false }) {
    // Loading state
    if (isLoading) {
        return (
            <div className={styles.container}>
                <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
                    <Loader2 size={32} className="animate-spin" style={{ color: '#6b1830' }} />
                </div>
            </div>
        );
    }

    if (!books.length) return null;

    // Pega os primeiros 5 livros (já vêm do backend ordenados por popularidade)
    const topBooks = books.slice(0, 5);

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
                    <div className={styles.headerBackground}>
                        <div className={styles.gradientOrb1}></div>
                        <div className={styles.gradientOrb2}></div>
                    </div>
                    <div className={styles.headerContent}>
                        <div className={styles.iconWrapper}>
                            <div className={styles.iconGlow}></div>
                            <TrendingUp size={28} className={styles.trendingIcon} strokeWidth={2.5} />
                        </div>
                        <div className={styles.titleWrapper}>
                            <h2 className={styles.title}>
                                Most Read Books
                                <span className={styles.titleAccent}>This Week</span>
                            </h2>
                            <p className={styles.subtitle}>Discover what the community is reading right now</p>
                        </div>
                    </div>
                    <div className={styles.rankBadgeHeader}>
                        <span className={styles.rankLabel}>TOP</span>
                        <span className={styles.rankNumber}>5</span>
                    </div>
                </div>

                {/* Grid de livros */}
                <div className={styles.bookGrid}>
                    {topBooks.map((book, index) => {
                        const position = index + 1;
                        const imageUrl =
                            book.cover_url || `https://source.unsplash.com/400x600/?book,${book.genre || 'literature'}`;

                        return (
                            <motion.div
                                key={book.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -12, scale: 1.02 }}
                                className={styles.bookCardWrapper}
                            >
                                <Link to={`/books/${encodeURIComponent(book.id)}`} className={styles.bookLink}>
                                    {/* Medalha de posição */}
                                    <div className={`${styles.positionBadge} ${getPositionColor(position)}`}>
                                        {position === 1 ? <Crown size={18} /> : position}
                                    </div>

                                    {/* Card do livro */}
                                    <div className={styles.coverContainer}>
                                        {/* Book spine */}
                                        <div className={styles.spine} />

                                        {/* Cover image */}
                                        <div className={styles.imageWrapper}>
                                            <BookCoverImage
                                                src={imageUrl}
                                                alt={book.title}
                                                className={styles.coverImage}
                                            />
                                            <div className={styles.shine} />
                                        </div>

                                        {/* Hover overlay */}
                                        <div className={styles.overlay}>
                                            <div className={styles.overlayContent}>
                                                <div className={styles.viewButton}>
                                                    <Eye size={18} />
                                                    <span>View Details</span>
                                                </div>
                                                {book.description && (
                                                    <p className={styles.description}>
                                                        {book.description.length > 100
                                                            ? `${book.description.substring(0, 100)}...`
                                                            : book.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Bottom shadow */}
                                        <div className={styles.bottomShadow} />
                                    </div>

                                    {/* Book info */}
                                    <div className={styles.bookInfo}>
                                        <h3 className={styles.bookTitle}>{book.title}</h3>
                                        <p className={styles.bookAuthor}>{book.author}</p>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default MostReadBooks;