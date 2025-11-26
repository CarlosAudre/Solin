import React, { useState, useEffect } from "react";
import styles from "./Profile.module.css";
import { Heart, BookOpen, Calendar, BookMarked, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueries } from "@tanstack/react-query";
import { getCurrentUser, getReadingList, getFavorites } from "../services/api";
import api from "../services/api";
import ProfileBookCard from "../books/ProfileBookCard";
import { motion } from "framer-motion";

export default function Profile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("completed");

  // Busca dados do usuário
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });

  // Busca lista de leitura
  const { data: readingList = [], isLoading: readingListLoading } = useQuery({
    queryKey: ["readingList"],
    queryFn: () => getReadingList(),
  });

  // Busca favoritos
  const { data: favoritesList = [], isLoading: favoritesLoading } = useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
  });

  // Busca detalhes de todos os livros da reading list
  const readingListBookQueries = useQueries({
    queries: readingList.map((item) => ({
      queryKey: ["book", item.book_key],
      queryFn: () => api.get(`/books/${item.book_key}`).then(res => res.data),
      enabled: !!item.book_key,
    })),
  });

  // Busca detalhes de todos os livros favoritos
  const favoritesBookQueries = useQueries({
    queries: favoritesList.map((item) => ({
      queryKey: ["book", item.book_key],
      queryFn: () => api.get(`/books/${item.book_key}`).then(res => res.data),
      enabled: !!item.book_key,
    })),
  });

  // Combina os dados do backend com os detalhes dos livros
  const readingListWithDetails = readingList.map((item, index) => ({
    ...item,
    bookDetails: readingListBookQueries[index]?.data,
  })).filter(item => item.bookDetails);

  const favoritesWithDetails = favoritesList.map((item, index) => ({
    ...item,
    bookDetails: favoritesBookQueries[index]?.data,
  })).filter(item => item.bookDetails);

  // Processa os livros por status
  const currentlyReading = readingListWithDetails.filter((book) => book.status === "reading");
  const planToRead = readingListWithDetails.filter((book) => book.status === "want_to_read");
  const completed = readingListWithDetails.filter((book) => book.status === "read");
  const favoriteBooks = favoritesWithDetails;

  // Verifica se ainda está carregando os detalhes dos livros
  const isLoadingBookDetails = readingListBookQueries.some(q => q.isLoading) ||
                                favoritesBookQueries.some(q => q.isLoading);

  const isLoading = userLoading || readingListLoading || favoritesLoading || isLoadingBookDetails;

  const renderBooks = (list, icon, emptyTitle, emptyText) => {
    if (isLoading) {
      return (
        <div className={styles.loadingContainer}>
          <Loader2 size={48} className="animate-spin" style={{ color: '#6b1830' }} />
          <p>Loading books...</p>
        </div>
      );
    }

    if (list.length === 0) {
      const Icon = icon;
      return (
        <div className={styles.emptyBox}>
          <Icon className={styles.emptyIcon} />
          <h3 className={styles.emptyTitle}>{emptyTitle}</h3>
          <p className={styles.emptyText}>{emptyText}</p>
        </div>
      );
    }

    return (
      <div className={styles.booksGrid}>
        {list.map((item, index) => {
          const bookDetails = item.bookDetails;
          if (!bookDetails) return null;

          return (
            <motion.div
              key={item.book_key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <ProfileBookCard book={bookDetails} />
            </motion.div>
          );
        })}
      </div>
    );
  };

  if (userLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Loader2 size={48} className="animate-spin" style={{ color: '#6b1830' }} />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.avatar}>
            <span>{user?.username?.charAt(0).toUpperCase() || 'U'}</span>
          </div>
          <div className={styles.userInfo}>
            <h1 className={styles.username}>{user?.username || 'User'}</h1>
            <p className={styles.email}>{user?.email || ''}</p>
          </div>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statBox}>
            <div className={styles.statLabel}>
              <Heart size={18} /> <span>Favorites</span>
            </div>
            <p className={styles.statValue}>{favoriteBooks.length}</p>
          </div>
          <div className={styles.statBox}>
            <div className={styles.statLabel}>
              <BookOpen size={18} /> <span>Reading</span>
            </div>
            <p className={styles.statValue}>{currentlyReading.length}</p>
          </div>
          <div className={styles.statBox}>
            <div className={styles.statLabel}>
              <Calendar size={18} /> <span>To Read</span>
            </div>
            <p className={styles.statValue}>{planToRead.length}</p>
          </div>
          <div className={styles.statBox}>
            <div className={styles.statLabel}>
              <BookMarked size={18} /> <span>Completed</span>
            </div>
            <p className={styles.statValue}>{completed.length}</p>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className={styles.content}>
        <div className={styles.tabs}>
          <button
            onClick={() => setActiveTab("currently_reading")}
            className={`${styles.tabButton} ${
              activeTab === "currently_reading" ? styles.active : ""
            }`}
          >
            <BookOpen size={16} /> Currently Reading
          </button>
          <button
            onClick={() => setActiveTab("plan_to_read")}
            className={`${styles.tabButton} ${
              activeTab === "plan_to_read" ? styles.active : ""
            }`}
          >
            <Calendar size={16} /> Plan to Read
          </button>
          <button
            onClick={() => setActiveTab("favorites")}
            className={`${styles.tabButton} ${
              activeTab === "favorites" ? styles.active : ""
            }`}
          >
            <Heart size={16} /> Favorites
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`${styles.tabButton} ${
              activeTab === "completed" ? styles.active : ""
            }`}
          >
            <BookMarked size={16} /> Completed
          </button>
        </div>

        <div className={styles.tabContent}>
          {activeTab === "currently_reading" &&
            renderBooks(
              currentlyReading,
              BookOpen,
              "No books currently reading",
              "Start reading a book to see it here"
            )}
          {activeTab === "plan_to_read" &&
            renderBooks(
              planToRead,
              Calendar,
              "No books in your reading list",
              "Add books you plan to read"
            )}
          {activeTab === "favorites" &&
            renderBooks(
              favoriteBooks,
              Heart,
              "No favorite books yet",
              "Mark books as favorites to see them here"
            )}
          {activeTab === "completed" &&
            renderBooks(
              completed,
              BookMarked,
              "No completed books yet",
              "Finish reading a book to add it here"
            )}
        </div>
      </div>
    </div>
  );
}
