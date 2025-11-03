import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import styles from "./Home.module.css";
import MostReadBooks from "../home/MostReadBooks";
import TrendingNow from "../home/TrendingNow";
import Explore from "../home/Explore";
import { booksMock } from "../mocks/booksMock"; 

function Home() {
  const [featuredBook, setFeaturedBook] = useState(null);
  const [books, setBooks] = useState([]);
  const [userBooks, setUserBooks] = useState([]);

  useEffect(() => {
    // Livro em destaque (mock)
    setFeaturedBook({
      id: 1,
      title: "The Midnight Library",
      author: "Matt Haig",
      description:
        "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.",
      cover_url:
        "https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&w=1600&q=80",
    });

    // Mock de livros
    setBooks(booksMock);

    // Mock de livros do usuário
    setUserBooks([
      { user_id: 1, book_id: 1, is_favorite: true },
      { user_id: 2, book_id: 1 },
      { user_id: 3, book_id: 2 },
    ]);
  }, []);

  if (!featuredBook) return null;

  return (
    <div>
      {/* Hero Section */}
      <div className={styles.hero}>
        <div
          className={styles.background}
          style={{ backgroundImage: `url(${featuredBook.cover_url})` }}
        >
          <div className={styles.overlay}></div>
        </div>

        <div className={styles.content}>
          <div className={styles.featureTag}>
            <Sparkles size={18} className={styles.sparkleIcon} />
            <span>Destaque</span>
          </div>

          <h1 className={styles.title}>{featuredBook.title}</h1>
          <p className={styles.author}>por {featuredBook.author}</p>
          <p className={styles.description}>{featuredBook.description}</p>

          <Link to={`/books/${featuredBook.id}`} className={styles.button}>
            Ver Detalhes <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      {/* Conteúdo principal (centralizado e limitado) */}
      <div className={styles.mainContent}>
        <MostReadBooks books={books} userBooks={userBooks} />
        <TrendingNow books={books} userBooks={userBooks} />
        <Explore books={books} userBooks={userBooks} />
      </div>
    </div>
  );
}

export default Home;
