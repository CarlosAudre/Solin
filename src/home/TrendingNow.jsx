import { Flame, TrendingUp, Zap } from "lucide-react";
import { motion } from "framer-motion";
import styles from "./TrendingNow.module.css";
import BookCard from "../books/BookCard";

function TrendingNow({ books = [], userBooks = [] }) {
    // Exemplo simples: pega os 6 primeiros livros da lista
    const trendingBooks = books.slice(0, 6);
    
    if (!trendingBooks.length) return null;

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
                            <Flame size={28} className={styles.flameIcon} strokeWidth={2.5} />
                        </div>
                        <div className={styles.titleWrapper}>
                            
                            <h2 className={styles.title}>
                                Trending Now
                                <span className={styles.titleAccent}>What's Popular</span>
                            </h2>
                            <p className={styles.subtitle}>The hottest books everyone's talking about</p>
                        </div>
                    </div>
                    <div className={styles.trendBadge}>
                        <TrendingUp size={20} className={styles.trendIcon} />
                        <span className={styles.badgeText}>HOT</span>
                    </div>
                </div>

                {/* Grid de livros */}
                <div className={styles.grid}>
                    {trendingBooks.map((book, index) => {
                        const userBook = userBooks.find(
                            (ub) => ub.book_id === book.id
                        );
                        return (
                            <motion.div
                                key={book.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.4 }}
                                whileHover={{ y: -8 }}
                            >
                                <BookCard book={book} userBook={userBook} />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default TrendingNow;