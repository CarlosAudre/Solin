import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./BookDetail.module.css";
import { ArrowLeft, Heart, BookOpen, Calendar, CheckCircle, Loader2, Star } from "lucide-react";
import CommentSection from "../books/CommentSection";
import BookCoverImage from "../components/BookCoverImage";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addToFavorites,
  removeFromFavorites,
  getFavorites,
  addToReadingList,
  updateReadingStatus,
  removeFromReadingList,
  getReadingList
} from "../services/api";
import api from "../services/api";


function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const decodedId = decodeURIComponent(id);

  const [isFavorite, setIsFavorite] = useState(false);
  const [status, setStatus] = useState(null);

  const { data: book, isLoading, error } = useQuery({
    queryKey: ["book", decodedId],
    queryFn: () => api.get(`/books/${decodedId}`).then(res => res.data)
  });

  // Busca favoritos do usuário
  const { data: favorites = [] } = useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
  });

  // Busca reading list do usuário
  const { data: readingList = [] } = useQuery({
    queryKey: ["readingList"],
    queryFn: getReadingList,
  });

  // Verifica se o livro está nos favoritos
  useEffect(() => {
    if (favorites && book) {
      const isInFavorites = favorites.some(fav => fav.book_key === book.id);
      setIsFavorite(isInFavorites);
    }
  }, [favorites, book]);

  // Verifica o status do livro na reading list
  useEffect(() => {
    if (readingList && book) {
      const bookInList = readingList.find(item => item.book_key === book.id);
      if (bookInList) {
        setStatus(bookInList.status);
      } else {
        setStatus(null);
      }
    }
  }, [readingList, book]);

  // Mutation para adicionar/remover favoritos
  const toggleFavoriteMutation = useMutation({
    mutationFn: async () => {
      if (isFavorite) {
        await removeFromFavorites(book.id);
      } else {
        await addToFavorites({ book_key: book.id });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["favorites"]);
      setIsFavorite(!isFavorite);
    },
  });

  // Mutation para atualizar status de leitura
  const updateStatusMutation = useMutation({
    mutationFn: async (newStatus) => {
      const bookInList = readingList.find(item => item.book_key === book.id);

      if (status === newStatus) {
        // Remove da lista se clicar no mesmo status
        if (bookInList) {
          await removeFromReadingList(book.id);
        }
        return null;
      } else {
        if (bookInList) {
          // Atualiza status existente
          await updateReadingStatus(book.id, newStatus);
        } else {
          // Adiciona novo livro à lista
          await addToReadingList({ book_key: book.id, status: newStatus });
        }
        return newStatus;
      }
    },
    onSuccess: (newStatus) => {
      queryClient.invalidateQueries(["readingList"]);
      setStatus(newStatus);
    },
  });

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Loader2 size={48} className="animate-spin" style={{ color: '#6b1830' }} />
      </div>
    );
  }

  if (error || !book) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Erro ao carregar livro. Tente novamente mais tarde.</p>
        <button onClick={() => navigate(-1)} style={{ marginTop: '1rem' }}>
          Voltar
        </button>
      </div>
    );
  }

  const handleToggleFavorite = () => {
    toggleFavoriteMutation.mutate();
  };

  const handleSetStatus = (newStatus) => {
    updateStatusMutation.mutate(newStatus);
  };

  const imageUrl = book.cover_url || `https://source.unsplash.com/400x600/?book,${book.genre || 'literature'}`;

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <button onClick={() => navigate(-1)} className={styles.backBtn}>
            <ArrowLeft size={20} /> Back
          </button>

          <div className={styles.heroGrid}>
            {/* Book Cover */}
            <div className={styles.coverWrapper}>
              <div className={styles.coverContainer}>
                <BookCoverImage
                  src={imageUrl}
                  alt={book.title}
                  className={styles.cover}
                />
                <div className={styles.coverShadow} />
              </div>
            </div>

            {/* Book Information */}
            <div className={styles.info}>
              <div className={styles.infoHeader}>
                <span className={styles.genre}>{book.genre}</span>
                <div className={styles.rating}>
                  <Star size={16} fill="#f59e0b" color="#f59e0b" />
                  <span>4.5</span>
                </div>
              </div>

              <h1 className={styles.title}>{book.title}</h1>
              <p className={styles.author}>by {book.author}</p>

              {/* Book Stats */}
              <div className={styles.stats}>
                {book.publication_year && (
                  <div className={styles.stat}>
                    <span className={styles.statLabel}>Published</span>
                    <span className={styles.statValue}>{book.publication_year}</span>
                  </div>
                )}
                {book.pages && (
                  <div className={styles.stat}>
                    <span className={styles.statLabel}>Pages</span>
                    <span className={styles.statValue}>{book.pages}</span>
                  </div>
                )}
                {book.publisher && (
                  <div className={styles.stat}>
                    <span className={styles.statLabel}>Publisher</span>
                    <span className={styles.statValue}>{book.publisher}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className={styles.actions}>
                <button
                  className={`${styles.actionBtn} ${styles.primaryBtn} ${isFavorite ? styles.activeFav : ""}`}
                  onClick={handleToggleFavorite}
                >
                  <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
                  {isFavorite ? "Favorited" : "Add to Favorites"}
                </button>

                <button
                  className={`${styles.actionBtn} ${styles.secondaryBtn} ${status === "reading" ? styles.activeReading : ""}`}
                  onClick={() => handleSetStatus("reading")}
                >
                  <BookOpen size={18} />
                  {status === "reading" ? "Reading" : "Start Reading"}
                </button>
              </div>

              {/* Additional Actions */}
              <div className={styles.secondaryActions}>
                <button
                  className={`${styles.smallBtn} ${status === "want_to_read" ? styles.activePlan : ""}`}
                  onClick={() => handleSetStatus("want_to_read")}
                >
                  <Calendar size={16} />
                  {status === "want_to_read" ? "In List" : "Add to List"}
                </button>

                <button
                  className={`${styles.smallBtn} ${status === "read" ? styles.activeDone : ""}`}
                  onClick={() => handleSetStatus("read")}
                >
                  <CheckCircle size={16} />
                  {status === "read" ? "Completed" : "Mark as Read"}
                </button>
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
        <CommentSection bookId={book.id} />
      </section>
    </div>
  );
}

export default BookDetail;
