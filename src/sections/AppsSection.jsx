import Section from '../components/Section.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import { projects } from '../data/projects.js';
import styles from './AppsSection.module.css';

export default function AppsSection() {
  return (
    <Section
      id="apps"
      eyebrow="Open source"
      title="Privacy-focused apps & self-hosting"
      lead="A small, growing collection of apps I build and use myself. All open source, all self-hostable."
    >
      <div className={styles.grid}>
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
      <p className={styles.note}>
        Want to host these yourself? Setup guides are{' '}
        <a href="https://github.com/barriellawertheimer" target="_blank" rel="noreferrer">
          on my GitHub
        </a>
        .
      </p>
    </Section>
  );
}
