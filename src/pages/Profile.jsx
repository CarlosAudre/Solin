import React, { useState } from "react";
import styles from "./Profile.module.css";
import { Heart, BookOpen, Calendar, BookMarked, Edit2, X } from "lucide-react";
import { booksMock } from "../mocks/booksMock";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "carlosaudre180",
    email: "carlosaudre180@gmail.com",
    avatar: null, // imagem personalizada
  });

  const [activeTab, setActiveTab] = useState("completed");
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(user.name);
  const [tempAvatar, setTempAvatar] = useState(user.avatar);

  const userBooks = [
    { book_id: 1, status: "completed", is_favorite: true },
    { book_id: 2, status: "currently_reading", is_favorite: false },
    { book_id: 3, status: "plan_to_read", is_favorite: false },
    { book_id: 4, status: "favorites", is_favorite: true },
  ];

  const mergeBooks = (filterFn) =>
    userBooks
      .filter(filterFn)
      .map((ub) => ({
        ...booksMock.find((b) => b.id === ub.book_id),
        userBook: ub,
      }))
      .filter((b) => b.id);

  const favoriteBooks = mergeBooks((ub) => ub.is_favorite);
  const currentlyReading = mergeBooks(
    (ub) => ub.status === "currently_reading"
  );
  const planToRead = mergeBooks((ub) => ub.status === "plan_to_read");
  const completed = mergeBooks((ub) => ub.status === "completed");

  const handleBookClick = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setTempAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {//Salva edição do user | Trocar por um put
    setUser({ ...user, name: tempName, avatar: tempAvatar });
    setIsEditing(false);
  };

  const renderBooks = (list, icon, emptyTitle, emptyText) => {
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
        {list.map((book) => (
          <div
            key={book.id}
            className={styles.bookCard}
            onClick={() => handleBookClick(book.id)}
          >
            <img
              src={book.cover_url}
              alt={book.title}
              className={styles.bookCover}
            />
            <div className={styles.bookInfo}>
              <h4 className={styles.bookTitle}>{book.title}</h4>
              <p className={styles.bookAuthor}>{book.author}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.page}>
      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.avatarWrapper}>
            {user.avatar ? (
              <img src={user.avatar} alt="Avatar" className={styles.avatarImg} />
            ) : (
              <div className={styles.avatar}>
                <span>{user.name.charAt(0).toUpperCase()}</span>
              </div>
            )}
          </div>
          <div>
            <h1 className={styles.username}>{user.name}</h1>
            <p className={styles.email}>{user.email}</p>
          </div>

          <button
            className={styles.editButton}
            onClick={() => setIsEditing(true)}
          >
            <Edit2 size={16} /> Edit Profile
          </button>
        </div>

        {/* STATS */}
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

      {/* 🔹 MODAL DE EDIÇÃO */}
      {isEditing && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <button
              className={styles.closeButton}
              onClick={() => setIsEditing(false)}
            >
              <X size={20} />
            </button>
            <h2>Edit Profile</h2>

            <div className={styles.editForm}>
              <label>Profile Picture</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
              />
              {tempAvatar && (
                <img
                  src={tempAvatar}
                  alt="Preview"
                  className={styles.avatarPreview}
                />
              )}

              <label>Username</label>
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
              />

              <button className={styles.saveButton} onClick={handleSave}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
