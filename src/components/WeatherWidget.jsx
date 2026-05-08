import { useState } from 'react';
import { useWeather } from '../hooks/useWeather.js';
import OutfitSuggestion from './OutfitSuggestion.jsx';
import styles from './WeatherWidget.module.css';

export default function WeatherWidget() {
  const { status, data, error, refetch, setCity, locate } = useWeather();
  const [cityInput, setCityInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(cityInput);
  };

  const showCityForm = status === 'error' || status === 'idle';

  return (
    <div className={styles.widget}>
      <div className={styles.controls}>
        <button
          type="button"
          className={styles.locateBtn}
          onClick={locate}
          disabled={status === 'locating' || status === 'loading'}
        >
          {status === 'locating' ? 'Finding you…' : 'Use my location'}
        </button>
        <form className={styles.form} onSubmit={handleSubmit} aria-label="Look up city">
          <label htmlFor="city" className="visually-hidden">City</label>
          <input
            id="city"
            type="text"
            placeholder="Or enter a city (e.g. Lisbon)"
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            autoComplete="off"
          />
          <button type="submit" disabled={!cityInput.trim() || status === 'loading'}>
            Check
          </button>
        </form>
      </div>

      {status === 'loading' && (
        <p className={styles.status} role="status">Loading the forecast…</p>
      )}

      {status === 'error' && (
        <div className={styles.errorBox} role="alert">
          <p>{error?.message ?? 'Something went wrong.'}</p>
          {showCityForm && (
            <p className={styles.hint}>Try entering a city above instead.</p>
          )}
        </div>
      )}

      {status === 'ready' && data && (
        <>
          <OutfitSuggestion data={data} />
          <button type="button" className={styles.refresh} onClick={refetch}>
            Refresh
          </button>
        </>
      )}
    </div>
  );
}
