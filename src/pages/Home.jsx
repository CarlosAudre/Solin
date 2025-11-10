import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Sparkles, Loader2 } from "lucide-react";
import styles from "./Home.module.css";
import MostReadBooks from "../home/MostReadBooks";
import TrendingNow from "../home/TrendingNow";
import Explore from "../home/Explore";
import {
  getFeaturedBook,
  getMostReadBooks,
  getTrendingBooks,
  getExploreBooks,
} from "../services/api";

function Home() {
  // Queries para buscar dados da API
  const {
    data: featuredBook,
    isLoading: featuredLoading,
    error: featuredError,
  } = useQuery({
    queryKey: ["LordOfTheRings"],
    queryFn: getFeaturedBook,
  });

  const {
    data: mostReadBooks,
    isLoading: mostReadLoading,
  } = useQuery({
    queryKey: ["mostReadBooks"],
    queryFn: getMostReadBooks,
  });

  const {
    data: trendingBooks,
    isLoading: trendingLoading,
  } = useQuery({
    queryKey: ["trendingBooks"],
    queryFn: getTrendingBooks,
  });

  const {
    data: exploreBooks,
    isLoading: exploreLoading,
  } = useQuery({
    queryKey: ["exploreBooks"],
    queryFn: getExploreBooks,
  });

  // Loading state para o livro em destaque
  if (featuredLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Loader2 size={48} className="animate-spin" style={{ color: '#6b1830' }} />
      </div>
    );
  }

  // Error state para o livro em destaque
  if (featuredError) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Erro ao carregar livro em destaque. Tente novamente mais tarde.</p>
      </div>
    );
  }

  if (!featuredBook) return null;

  // URL da imagem customizada - substitua pelo caminho da sua imagem
  const featuredImageUrl = '/images/lotr-cover.jpg';

  return (
    <div>
      {/* Hero Section */}
      <div className={styles.hero}>
        <div
          className={styles.background}
          style={{ backgroundImage: `url(${featuredImageUrl})` }}
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
            See Details <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      {/* Conteúdo principal (centralizado e limitado) */}
      <div className={styles.mainContent}>
        <MostReadBooks books={mostReadBooks || []} isLoading={mostReadLoading} />
        <TrendingNow books={trendingBooks || []} isLoading={trendingLoading} />
        <Explore books={exploreBooks || []} isLoading={exploreLoading} />
      </div>
    </div>
  );
}

export default Home;
