import Header from './components/Header.jsx';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import ServicesSection from './sections/ServicesSection.jsx';
import AppsSection from './sections/AppsSection.jsx';
import WhatToWearSection from './sections/WhatToWearSection.jsx';
import AboutSection from './sections/AboutSection.jsx';
import ContactSection from './sections/ContactSection.jsx';

const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#apps', label: 'Privacy-Focused Apps' },
  { href: '#what-to-wear', label: 'What to Wear' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <Nav links={navLinks} />
      <main id="main">
        <ServicesSection />
        <AppsSection />
        <WhatToWearSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
