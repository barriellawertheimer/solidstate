import { useCallback, useEffect, useRef, useState } from 'react';

const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';
const GEOCODE_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const CACHE_PREFIX = 'weather:';

function cacheKey(lat, lon) {
  return `${CACHE_PREFIX}${lat.toFixed(2)},${lon.toFixed(2)}`;
}

function readCache(key) {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.savedAt > 15 * 60 * 1000) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

function writeCache(key, data) {
  try {
    sessionStorage.setItem(key, JSON.stringify({ savedAt: Date.now(), data }));
  } catch {
    // sessionStorage may be unavailable in private mode — silently skip.
  }
}

async function fetchForecast({ lat, lon, place }) {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    current: 'temperature_2m,precipitation,wind_speed_10m,weather_code',
    temperature_unit: 'celsius',
    wind_speed_unit: 'kmh',
    timezone: 'auto',
  });
  const res = await fetch(`${FORECAST_URL}?${params.toString()}`);
  if (!res.ok) throw new Error(`Forecast request failed (${res.status})`);
  const json = await res.json();
  const c = json.current ?? {};
  return {
    tempC: c.temperature_2m,
    precipMm: c.precipitation ?? 0,
    windKmh: c.wind_speed_10m ?? 0,
    weatherCode: c.weather_code ?? 0,
    place: place ?? `${lat.toFixed(2)}, ${lon.toFixed(2)}`,
    observedAt: c.time,
    lat,
    lon,
  };
}

async function geocode(name) {
  const params = new URLSearchParams({ name, count: '1', language: 'en', format: 'json' });
  const res = await fetch(`${GEOCODE_URL}?${params.toString()}`);
  if (!res.ok) throw new Error(`Could not look up "${name}".`);
  const json = await res.json();
  const hit = json.results?.[0];
  if (!hit) throw new Error(`No place found for "${name}".`);
  const placeParts = [hit.name, hit.admin1, hit.country].filter(Boolean);
  return { lat: hit.latitude, lon: hit.longitude, place: placeParts.join(', ') };
}

export function useWeather({ autoLocate = true } = {}) {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const aliveRef = useRef(true);

  useEffect(() => {
    aliveRef.current = true;
    return () => {
      aliveRef.current = false;
    };
  }, []);

  const loadFromCoords = useCallback(async ({ lat, lon, place }) => {
    const key = cacheKey(lat, lon);
    const cached = readCache(key);
    if (cached) {
      if (!aliveRef.current) return;
      setData({ ...cached, place: place ?? cached.place });
      setStatus('ready');
      return;
    }
    setStatus('loading');
    try {
      const fresh = await fetchForecast({ lat, lon, place });
      if (!aliveRef.current) return;
      writeCache(key, fresh);
      setData(fresh);
      setError(null);
      setStatus('ready');
    } catch (err) {
      if (!aliveRef.current) return;
      setError({ code: 'fetch', message: err.message });
      setStatus('error');
    }
  }, []);

  const locate = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setError({ code: 'unavailable', message: 'Geolocation is not supported in this browser.' });
      setStatus('error');
      return;
    }
    setStatus('locating');
    setError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        loadFromCoords({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          place: 'Your location',
        });
      },
      (err) => {
        if (!aliveRef.current) return;
        const code = err.code === err.PERMISSION_DENIED ? 'denied' : 'unavailable';
        setError({
          code,
          message:
            code === 'denied'
              ? 'Location permission denied. Enter a city below instead.'
              : 'Could not get your location. Enter a city below instead.',
        });
        setStatus('error');
      },
      { timeout: 5000, maximumAge: 5 * 60 * 1000 },
    );
  }, [loadFromCoords]);

  const setCity = useCallback(
    async (name) => {
      const trimmed = name?.trim();
      if (!trimmed) return;
      setStatus('loading');
      setError(null);
      try {
        const place = await geocode(trimmed);
        await loadFromCoords(place);
      } catch (err) {
        if (!aliveRef.current) return;
        setError({ code: 'geocode', message: err.message });
        setStatus('error');
      }
    },
    [loadFromCoords],
  );

  const refetch = useCallback(() => {
    if (data) {
      loadFromCoords({ lat: data.lat, lon: data.lon, place: data.place });
    } else {
      locate();
    }
  }, [data, loadFromCoords, locate]);

  useEffect(() => {
    if (autoLocate) locate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { status, data, error, refetch, setCity, locate };
}
