import { Flame } from "lucide-react";
import styles from "./TrendingNow.module.css";
import BookCard from "../books/BookCard";

function TrendingNow({ books = [], userBooks = [] }) {
    // Exemplo simples: pega os 6 primeiros livros da lista
    const trendingBooks = books.slice(0, 6);

    if (!trendingBooks.length) return null;

    return (
        <div className={styles.trendingSection}>
            <div className={styles.header}>
                <div className={styles.iconBox}>
                    <Flame size={20} className={styles.icon} />
                </div>
                <h2 className={styles.title}>Trending Now</h2>
                <span className={styles.badge}>🔥 Hot Picks</span>
            </div>

            <div className={styles.grid}>
                {trendingBooks.map((book) => {
                    const userBook = userBooks.find(
                        (ub) => ub.book_id === book.id
                    );
                    return (
                        <BookCard
                            key={book.id}
                            book={book}
                            userBook={userBook}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default TrendingNow;
