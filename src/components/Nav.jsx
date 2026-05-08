import { useEffect, useState } from 'react';
import styles from './Nav.module.css';

export default function Nav({ links }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <nav className={styles.nav} aria-label="Primary">
      <div className={`container ${styles.inner}`}>
        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={styles.toggleIcon} aria-hidden="true">
            <span data-open={open} />
            <span data-open={open} />
            <span data-open={open} />
          </span>
          <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
        </button>
        <ul
          id="primary-nav"
          className={styles.menu}
          data-open={open}
        >
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
