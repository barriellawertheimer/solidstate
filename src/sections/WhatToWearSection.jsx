import Section from '../components/Section.jsx';
import WeatherWidget from '../components/WeatherWidget.jsx';

export default function WhatToWearSection() {
  return (
    <Section
      id="what-to-wear"
      eyebrow="Live demo"
      title="What to Wear Today"
      lead="Allow location or enter a city — get a real outfit suggestion based on the live forecast. Powered by Open-Meteo."
    >
      <WeatherWidget />
    </Section>
  );
}
