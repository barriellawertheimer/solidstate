import styles from './Section.module.css';

export default function Section({ id, eyebrow, title, lead, children }) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-heading`}>
      <div className={`container ${styles.inner}`}>
        <header className={styles.head}>
          {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
          <h2 id={`${id}-heading`} className={styles.title}>{title}</h2>
          {lead && <p className={styles.lead}>{lead}</p>}
        </header>
        <div className={styles.body}>{children}</div>
      </div>
    </section>
  );
}
