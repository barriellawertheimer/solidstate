import styles from './ProjectCard.module.css';

const statusLabels = {
  active: 'Active',
  beta: 'Beta',
  archived: 'Archived',
};

export default function ProjectCard({ project }) {
  const { name, description, githubUrl, tags = [], status = 'active' } = project;
  return (
    <article className={styles.card}>
      <header className={styles.head}>
        <h3 className={styles.name}>{name}</h3>
        <span className={styles.status} data-status={status}>
          {statusLabels[status] ?? status}
        </span>
      </header>
      <p className={styles.description}>{description}</p>
      {tags.length > 0 && (
        <ul className={styles.tags} aria-label="Tags">
          {tags.map((tag) => (
            <li key={tag} className={styles.tag}>{tag}</li>
          ))}
        </ul>
      )}
      <a
        className={styles.link}
        href={githubUrl}
        target="_blank"
        rel="noreferrer"
      >
        View on GitHub
        <span aria-hidden="true"> →</span>
      </a>
    </article>
  );
}
