import Section from '../components/Section.jsx';
import styles from './AboutSection.module.css';

export default function AboutSection() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="Hi, I'm Barriella"
      lead="A tech generalist who'd rather solve a problem the right way than the loud way."
    >
      <div className={styles.body}>
        <p>
          I build user-friendly software, secure peoples' setups, and untangle the kinds of
          tech problems that make folks stop trusting their own machines. I care about
          privacy, simple tooling, and shipping things that keep working a year later.
        </p>
        <p>
          If you have an idea for an app, a security worry, or a setup that's been "almost
          working" for too long — that's the kind of thing I help with. Get in touch below.
        </p>
      </div>
    </Section>
  );
}
