"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname        = usePathname();

  const LINKS = [
    { href: "/",        label: "Home" },
    { href: "/gallery", label: "Gallery" },
    { href: "/booking", label: "Booking" },
  ];

  return (
    <>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          Celebra<span>.</span>
        </Link>

        <div className={styles.desktopLinks}>
          {LINKS.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={`${styles.navLink} ${pathname === l.href ? styles.navLinkActive : ""}`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <Link href="/booking" className={styles.cta}>
          Book an Event
        </Link>

        <button
          onClick={() => setOpen(!open)}
          className={styles.hamburger}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {open && (
        <div className={styles.mobileMenu}>
          {LINKS.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`${styles.mobileLinkItem} ${pathname === l.href ? styles.mobileLinkActive : ""}`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/booking"
            onClick={() => setOpen(false)}
            className={styles.mobileCta}
          >
            Book an Event
          </Link>
        </div>
      )}
    </>
  );
}