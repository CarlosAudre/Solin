import styles from "./Footer.module.css";
import { Mail, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Coluna 1 - Logo e descrição */}
        <div className={styles.col}>
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

          <p className={styles.desc}>
            Seu companheiro de leitura pessoal. Descubra, acompanhe e compartilhe seu amor por livros.
          </p>

          <p className={styles.made}>
            <Heart size={14} className={styles.heart} /> Feito para amantes de livros
          </p>
        </div>

        {/* Coluna 2 - Links rápidos */}
        <div className={styles.col}>
          <h4 className={styles.title}>Links Rápidos</h4>
          <ul className={styles.links}>
            <li><a href="#">Início</a></li>
            <li><a href="#">Explorar Livros</a></li>
            <li><a href="#">Minha Biblioteca</a></li>
          </ul>
        </div>

        {/* Coluna 3 - Contato */}
        <div className={styles.col}>
          <h4 className={styles.title}>Entre em Contato</h4>
          <p className={styles.text}>
            Tem dúvidas ou sugestões? Adoraríamos ouvir você.
          </p>
          <p className={styles.email}>
            <Mail size={14} className={styles.mailIcon} /> hello@solin.com
          </p>
        </div>
      </div>

      {/* Linha inferior */}
      <div className={styles.bottom}>
        <p>© 2025 Solin. Todos os direitos reservados.</p>
        <p>
          Desenvolvido com <Heart size={12} className={styles.heart} /> para leitores em todo lugar.
        </p>
      </div>
    </footer>
  );
}
