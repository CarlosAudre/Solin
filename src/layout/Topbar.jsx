import { NavLink } from "react-router-dom";
import { LogOut } from "lucide-react";
import styles from "./Topbar.module.css";

export default function Topbar({ usuario }) {
  return (
    <header className={styles.topbar}>
      {/* Logo */}
      <div className={styles.logoContainer}>
        <div className={styles.logoIcon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={styles.bookIcon}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6l4 2M8 6h8a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z"
            />
          </svg>
        </div>
        <span className={styles.logoText}>Solin</span>
      </div>

      {/* Menu */}
      <nav className={styles.navLinks}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/browse"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
        >
          Browse
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
        >
          My Library
        </NavLink>
      </nav>

      {/* Usuário */}
      <div className={styles.userSection}>
        <span className={styles.username}>{usuario?.nome || "User"}</span>
        <button className={styles.logoutBtn}>
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}
