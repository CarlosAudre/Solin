import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, BookOpen } from "lucide-react";
import styles from "./BookCard.module.css";

function BookCard({ book, userBook, compact = false }) {
    const imageUrl =
        book.cover_url || `https://source.unsplash.com/400x600/?book,${book.genre}`;

    return (
        <motion.div
            whileHover={{ y: -8, rotateY: 2, rotateX: -2 }}
            transition={{ duration: 0.3 }}
            className={styles.cardWrapper}
            style={{ perspective: "1000px" }}
        >
            <Link to={`/books/${book.id}`}>
                <div className={styles.coverContainer}>
                    {/* Book spine */}
                    <div className={styles.spine} />

                    {/* Cover image */}
                    <div className={styles.imageWrapper}>
                        <img
                            src={imageUrl}
                            alt={book.title}
                            className={styles.coverImage}
                        />
                        <div className={styles.shine} />
                    </div>

                    {/* Hover overlay */}
                    <div className={styles.overlay}>
                        <div className={styles.overlayContent}>
                            <p className={styles.description}>
                                {book.description || "No description available."}
                            </p>
                            <div className={styles.overlayFooter}>
                                {userBook?.is_favorite && (
                                    <Heart
                                        size={14}
                                        className={styles.favoriteIcon}
                                    />
                                )}
                                {userBook?.status && (
                                    <div className={styles.status}>
                                        <BookOpen size={12} />
                                        {userBook.status ===
                                        "currently_reading"
                                            ? "Reading"
                                            : "To Read"}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Bottom edge shadow */}
                    <div className={styles.bottomShadow} />
                </div>

                {!compact && (
                    <div className={styles.bookInfo}>
                        <h3 className={styles.title}>{book.title}</h3>
                        <p className={styles.author}>{book.author}</p>
                    </div>
                )}
            </Link>
        </motion.div>
    );
}

export default BookCard;
