import Section from '../components/Section.jsx';
import styles from './ServicesSection.module.css';

const services = [
  {
    title: 'Coding & Development',
    body: 'Custom software, websites, and small apps built with sensible tools and a bias toward shipping.',
    icon: '⌨',
  },
  {
    title: 'Tech Support',
    body: 'Calm troubleshooting for individuals and small businesses — hardware, software, networking.',
    icon: '🔧',
  },
  {
    title: 'Cybersecurity',
    body: 'Privacy-focused setups, security audits, and practical advice that holds up after the meeting.',
    icon: '🛡',
  },
];

export default function ServicesSection() {
  return (
    <Section
      id="services"
      eyebrow="What I do"
      title="Freelance tech services"
      lead="Three things I do well — pick whichever one matches your problem, or get in touch if it's a mix."
    >
      <ul className={styles.grid}>
        {services.map((s) => (
          <li key={s.title} className={styles.card}>
            <span className={styles.icon} aria-hidden="true">{s.icon}</span>
            <h3 className={styles.title}>{s.title}</h3>
            <p className={styles.body}>{s.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
