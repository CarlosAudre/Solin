import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";
import Footer from "./Footer";
import styles from "./MainLayout.module.css" // se quiser mover o estilo pra CSS separado


function MainLayout({ usuario }) {
  return (
    <div className={styles.layout}>
      <Topbar usuario={usuario} />

      {/* O conteúdo ocupa o espaço restante, empurrando o footer pra baixo */}
      <main className={styles.content}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;
