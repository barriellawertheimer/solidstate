// Open-Meteo WMO weather codes:
//   https://open-meteo.com/en/docs (search "Weather variable documentation")
// 0 clear · 1-3 partly cloudy · 45-48 fog · 51-67 rain · 71-77 snow ·
// 80-82 showers · 85-86 snow showers · 95-99 thunderstorm

const rules = [
  { when: (c) => c.weatherCode >= 95,                            outfit: 'Stay inside if you can — it is storming out there.', icon: '⛈' },
  { when: (c) => c.weatherCode >= 71 && c.weatherCode <= 77,     outfit: 'Heavy coat, waterproof boots, and gloves — it is snowing.', icon: '❄' },
  { when: (c) => c.weatherCode >= 85 && c.weatherCode <= 86,     outfit: 'Snow-ready coat and boots; expect snow showers.',         icon: '❄' },
  { when: (c) => c.precipMm >= 2,                                outfit: 'Waterproof jacket and closed shoes — bring an umbrella.', icon: '☔' },
  { when: (c) => c.tempC <= 0,                                   outfit: 'Heavy coat, hat, gloves — bundle up properly.',           icon: '🧥' },
  { when: (c) => c.tempC <= 10,                                  outfit: 'Warm jacket and long pants.',                             icon: '🧥' },
  { when: (c) => c.tempC <= 18,                                  outfit: 'Light jacket or hoodie over a long-sleeve.',              icon: '🧶' },
  { when: (c) => c.tempC <= 25,                                  outfit: 'T-shirt and jeans — comfortable weather.',                icon: '👕' },
  { when: () => true,                                            outfit: 'Shorts, a T-shirt, sun hat — and water.',                 icon: '☀' },
];

export function suggestOutfit(conditions) {
  const match = rules.find((rule) => rule.when(conditions)) ?? rules[rules.length - 1];
  const extras = [];
  if (conditions.windKmh >= 30 && conditions.weatherCode < 95) {
    extras.push('Add a windbreaker layer — it is windy.');
  }
  if (conditions.tempC >= 30) {
    extras.push('Drink water and avoid midday sun if possible.');
  }
  if (conditions.tempC <= -5) {
    extras.push('Cover exposed skin — frostbite range.');
  }
  return { outfit: match.outfit, icon: match.icon, extras };
}
