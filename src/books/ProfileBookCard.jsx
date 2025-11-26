import { Link } from "react-router-dom";
import BookCoverImage from "../components/BookCoverImage";
import styles from "./ProfileBookCard.module.css";

function ProfileBookCard({ book }) {
    const imageUrl = book.cover_url || `https://source.unsplash.com/400x600/?book,${book.genre || 'literature'}`;

    return (
        <Link to={`/books/${encodeURIComponent(book.id)}`} className={styles.link}>
            <div className={styles.card}>
                <div className={styles.coverContainer}>
                    <BookCoverImage
                        src={imageUrl}
                        alt={book.title}
                        className={styles.coverImage}
                    />
                </div>
                <div className={styles.bookInfo}>
                    <h4 className={styles.title}>{book.title}</h4>
                    <p className={styles.author}>{book.author}</p>
                </div>
            </div>
        </Link>
    );
}

export default ProfileBookCard;
