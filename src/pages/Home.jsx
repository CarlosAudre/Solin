import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import styles from "./Home.module.css";
import MostReadBooks from "../home/MostReadBooks";
import TrendingNow from "../home/TrendingNow";
import Explore from "../home/Explore";

function Home() {
    const [featuredBook, setFeaturedBook] = useState(null);
    const [books, setBooks] = useState([]);
    const [userBooks, setUserBooks] = useState([]);

    // MOCK temporário — simula API
    useEffect(() => {
        setFeaturedBook({
            id: 1,
            title: "The Midnight Library",
            author: "Matt Haig",
            description:
                "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.",
            cover_url:
                "https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&w=1600&q=80",
        });

        setBooks([
            {
                id: 1,
                title: "The Silent Patient",
                author: "Alex Michaelides",
                genre: "Thriller",
                cover_url:
                    "https://images-na.ssl-images-amazon.com/images/I/81n0E2xg8NL.jpg",
            },
            {
                id: 2,
                title: "The Midnight Library",
                author: "Matt Haig",
                genre: "Fiction",
                cover_url:
                    "https://images-na.ssl-images-amazon.com/images/I/81k7gKTDLtL.jpg",
            },
            {
                id: 3,
                title: "Where the Crawdads Sing",
                author: "Delia Owens",
                genre: "Fiction",
                cover_url:
                    "https://images-na.ssl-images-amazon.com/images/I/91W8b%2B4p%2BFL.jpg",
            },
            {
                id: 4,
                title: "Project Hail Mary",
                author: "Andy Weir",
                genre: "Science Fiction",
                cover_url:
                    "https://images-na.ssl-images-amazon.com/images/I/91t2xE2QqDL.jpg",
            },
            {
                id: 5,
                title: "The Name of the Wind",
                author: "Patrick Rothfuss",
                genre: "Fantasy",
                cover_url:
                    "https://images-na.ssl-images-amazon.com/images/I/81F9R5yD8yL.jpg",
            },
            
        ]);

        setUserBooks([
            { user_id: 1, book_id: 1, is_favorite: true },
            { user_id: 2, book_id: 1 },
            { user_id: 3, book_id: 2 },
        ]);
    }, []);

    /* 
    // Quando tiver API pronta:
    const { data: books = [] } = useQuery({
        queryKey: ["books"],
        queryFn: () => base44.entities.Book.list("-created_date"),
    });

    const { data: userBooks = [] } = useQuery({
        queryKey: ["userBooks"],
        queryFn: () => base44.entities.UserBook.list(),
    });

    const featuredBook = books.find(b => b.featured);
    */

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

          
            <div className={styles.mainContent}>
                <MostReadBooks books={books} userBooks={userBooks} />

                <TrendingNow  books={books} userBooks={userBooks}/>

                <Explore books={books} userBooks={userBooks} />
            </div>
        </div>
    );
}

export default Home;
