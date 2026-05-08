import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <h1 className={styles.title}>SolidState Studio Tech Services</h1>
        <p className={styles.tagline}>
          Coding, tech support, cybersecurity, and privacy-focused apps — built solo, with care.
        </p>
      </div>
    </header>
  );
}
