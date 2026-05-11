import { useRef, useState } from 'react';
import styles from './ContactForm.module.css';

const EMAIL = 'claude@barriella.com';
const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT;
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;

export default function ContactForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState({ kind: 'idle' });
  const widgetRef = useRef(null);

  const resetTurnstile = () => {
    if (window.turnstile && widgetRef.current) {
      window.turnstile.reset(widgetRef.current);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status.kind === 'sending') return;

    if (!CONTACT_ENDPOINT) {
      setStatus({ kind: 'error', message: 'Contact endpoint is not configured.' });
      return;
    }

    const turnstileToken = new FormData(e.target).get('cf-turnstile-response');
    if (!turnstileToken) {
      setStatus({ kind: 'error', message: 'Please complete the verification challenge.' });
      return;
    }

    setStatus({ kind: 'sending' });
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, message, turnstileToken }),
      });

      if (res.status === 202) {
        setStatus({ kind: 'sent' });
        setFirstName('');
        setLastName('');
        setEmail('');
        setMessage('');
        resetTurnstile();
        return;
      }

      let detail = '';
      try {
        const data = await res.json();
        detail = data.error ?? '';
      } catch {
        // non-JSON error response — fall through to status code
      }
      setStatus({
        kind: 'error',
        message: detail || `Request failed (${res.status}). Please try again.`,
      });
      resetTurnstile();
    } catch {
      setStatus({ kind: 'error', message: 'Network error. Please try again.' });
      resetTurnstile();
    }
  };

  const sending = status.kind === 'sending';

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.rowPair}>
        <div className={styles.row}>
          <label htmlFor="contact-first">First name</label>
          <input
            id="contact-first"
            name="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            maxLength={80}
            autoComplete="given-name"
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="contact-last">Last name</label>
          <input
            id="contact-last"
            name="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            maxLength={80}
            autoComplete="family-name"
          />
        </div>
      </div>

      <div className={styles.row}>
        <label htmlFor="contact-email">Email</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          maxLength={5000}
        />
      </div>

      <div
        ref={widgetRef}
        className="cf-turnstile"
        data-sitekey={TURNSTILE_SITE_KEY}
      />

      <button type="submit" className={styles.submit} disabled={sending}>
        {sending ? 'Sending…' : 'Send message'}
      </button>

      {status.kind === 'sent' && (
        <p className={styles.success}>Thanks — your message is on its way.</p>
      )}
      {status.kind === 'error' && (
        <p className={styles.errorNote}>{status.message}</p>
      )}
      
    </form>
  );
}
