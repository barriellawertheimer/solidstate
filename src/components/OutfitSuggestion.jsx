import styles from './OutfitSuggestion.module.css';
import { suggestOutfit } from '../data/outfitRules.js';

function fmtTemp(t) {
  return typeof t === 'number' ? `${Math.round(t)}°C` : '—';
}

function fmtMm(m) {
  return typeof m === 'number' ? `${m.toFixed(1)} mm` : '—';
}

function fmtWind(w) {
  return typeof w === 'number' ? `${Math.round(w)} km/h` : '—';
}

export default function OutfitSuggestion({ data }) {
  const suggestion = suggestOutfit(data);
  return (
    <div className={styles.wrap}>
      <div className={styles.headline}>
        <span className={styles.icon} aria-hidden="true">{suggestion.icon}</span>
        <p className={styles.text}>{suggestion.outfit}</p>
      </div>
      {suggestion.extras.length > 0 && (
        <ul className={styles.extras}>
          {suggestion.extras.map((extra) => (
            <li key={extra}>{extra}</li>
          ))}
        </ul>
      )}
      <dl className={styles.stats} aria-label="Current conditions">
        <div>
          <dt>Temperature</dt>
          <dd>{fmtTemp(data.tempC)}</dd>
        </div>
        <div>
          <dt>Precipitation</dt>
          <dd>{fmtMm(data.precipMm)}</dd>
        </div>
        <div>
          <dt>Wind</dt>
          <dd>{fmtWind(data.windKmh)}</dd>
        </div>
        <div>
          <dt>Place</dt>
          <dd>{data.place}</dd>
        </div>
      </dl>
    </div>
  );
}
