import Section from '../components/Section.jsx';
import ContactForm from '../components/ContactForm.jsx';

export default function ContactSection() {
  return (
    <Section
      id="contact"
      eyebrow="Get in touch"
      title="Contact me"
      lead="Got a project, a security worry, or a stubborn machine? Send a quick note."
    >
      <ContactForm />
    </Section>
  );
}
