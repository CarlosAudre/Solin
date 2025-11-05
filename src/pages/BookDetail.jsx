import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { booksMock } from "../mocks/booksMock"; 
import styles from "./BookDetail.module.css";
import { ArrowLeft, Heart, BookOpen, Calendar, CheckCircle } from "lucide-react";
import CommentSection from "../books/CommentSection";

// 🔮 Futuro: integração com API
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import api from "../../services/api";


function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = booksMock.find((b) => b.id === Number(id));

  const [isFavorite, setIsFavorite] = useState(false);
  const [status, setStatus] = useState(null);

  if (!book) {
    return <div className={styles.loading}>Carregando livro...</div>;
  }

  const handleToggleFavorite = () => setIsFavorite(!isFavorite);
  const handleSetStatus = (newStatus) =>
    setStatus(status === newStatus ? null : newStatus);

  return (
    <div className={styles.page}>
      {/* 🔝 Hero */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <button onClick={() => navigate(-1)} className={styles.backBtn}>
            <ArrowLeft size={16} /> Back
          </button>

          <div className={styles.heroGrid}>
            <img src={book.cover_url} alt={book.title} className={styles.cover} />

            <div className={styles.info}>
              <span className={styles.genre}>{book.genre}</span>
              <h1>{book.title}</h1>
              <p className={styles.author}>by {book.author}</p>

              <div className={styles.actions}>
                <button
                  className={`${styles.btn} ${isFavorite ? styles.activeFav : ""}`}
                  onClick={handleToggleFavorite}
                >
                  <Heart size={16} /> {isFavorite ? "Favorited" : "Add to Favorites"}
                </button>

                <button
                  className={`${styles.btn} ${
                    status === "reading" ? styles.active : ""
                  }`}
                  onClick={() => handleSetStatus("reading")}
                >
                  <BookOpen size={16} />{" "}
                  {status === "reading" ? "Reading" : "Mark as Reading"}
                </button>

                <button
                  className={`${styles.btn} ${
                    status === "plan" ? styles.active : ""
                  }`}
                  onClick={() => handleSetStatus("plan")}
                >
                  <Calendar size={16} />{" "}
                  {status === "plan" ? "Planned" : "Add to List"}
                </button>

                <button
                  className={`${styles.btn} ${
                    status === "done" ? styles.active : ""
                  }`}
                  onClick={() => handleSetStatus("done")}
                >
                  <CheckCircle size={16} />{" "}
                  {status === "done" ? "Completed" : "Mark as Read"}
                </button>
              </div>

              <div className={styles.details}>
                <div>
                  <p>Published</p>
                  <strong>{book.publication_year}</strong>
                </div>
                <div>
                  <p>Pages</p>
                  <strong>{book.pages}</strong>
                </div>
                <div>
                  <p>Publisher</p>
                  <strong>{book.publisher}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 📖 About */}
      <section className={styles.about}>
        <div className={styles.aboutCard}>
          <h2>About This Book</h2>
          <p>{book.description}</p>
        </div>
      </section>

      {/* 💬 Comments */}
      <section className={styles.comments}>
        <CommentSection bookId={book.id} comments={[]} user={null} />
      </section>
    </div>
  );
}

export default BookDetail;
