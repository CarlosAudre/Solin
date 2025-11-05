import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, Star } from "lucide-react";
import styles from "./BookCard.module.css";

function BookCard({ book, userBook, compact = false }) {
    const imageUrl =
        book.cover_url || `https://source.unsplash.com/400x600/?book,${book.genre}`;
    
    return (
        <motion.div
            whileHover={{ y: -12, scale: 1.02 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className={styles.cardWrapper}
        >
            <Link to={`/books/${book.id}`} className={styles.link}>
                <div className={styles.coverContainer}>
                    {/* Book spine effect */}
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
                    
                    {/* Hover overlay with gradient */}
                    <div className={styles.overlay}>
                        <div className={styles.overlayContent}>
                            <div className={styles.viewButton}>
                                <Eye size={18} />
                                <span>View Details</span>
                            </div>
                            {book.description && (
                                <p className={styles.description}>
                                    {book.description.length > 120 
                                        ? `${book.description.substring(0, 120)}...` 
                                        : book.description}
                                </p>
                            )}
                        </div>
                    </div>
                    
                    {/* Bottom shadow for depth */}
                    <div className={styles.bottomShadow} />
                </div>
                
                {!compact && (
                    <div className={styles.bookInfo}>
                        <h3 className={styles.title}>{book.title}</h3>
                        <p className={styles.author}>{book.author}</p>
                        {book.genre && (
                            <span className={styles.genre}>{book.genre}</span>
                        )}
                    </div>
                )}
            </Link>
        </motion.div>
    );
}

export default BookCard;