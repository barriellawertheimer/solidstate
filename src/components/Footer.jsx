import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p>&copy; {year} SolidState Studio Tech Services. All rights reserved.</p>
        <p className={styles.muted}>Built with React + Vite. Protected by Cloudflare</p>
      </div>
    </footer>
  );
}
