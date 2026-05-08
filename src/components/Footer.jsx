import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p>&copy; {year} Barriella's Tech Services. All rights reserved.</p>
        <p className={styles.muted}>Built with React + Vite. Hosted on GitHub Pages.</p>
      </div>
    </footer>
  );
}
