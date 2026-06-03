"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Home.module.css";

const TESTIMONIALS = [
  { text: "Celebra turned our vision into a day beyond anything we imagined. Every detail — the florals, the lighting, the timeline — was flawless.", author: "Sam & Dana", event: "Garden Wedding, June 2024" },
  { text: "Sofia's 30th was pure magic. They listened to exactly what we wanted and delivered a night our whole family still talks about.", author: "The Reyes Family", event: "Birthday Celebration" },
  { text: "As someone who plans events professionally, I was skeptical. Celebra exceeded my own standards. The coordination was impeccable.", author: "Michael Harrington", event: "Annual Gala, Oct 2024" },
];

const SERVICES = [
  { icon: "💍", name: "Weddings",       desc: "From intimate ceremonies to grand receptions. Full coordination, florals, catering liaison, and on-the-day management.", price: "From ₱85,000" },
  { icon: "🎂", name: "Birthdays",      desc: "Milestone birthdays deserve milestone events. Themed experiences with custom décor, entertainment, and curated menus.", price: "From ₱28,000" },
  { icon: "🥂", name: "Private Parties", desc: "Corporate dinners, debut celebrations, anniversary soirées — any private gathering elevated with full planning and styling.", price: "From ₱45,000" },
];

const STATS = [
  { num: "350+", label: "Events Hosted" },
  { num: "12",   label: "Expert Planners" },
  { num: "98%",  label: "Client Satisfaction" },
  { num: "8yrs", label: "In Business" },
];

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=75",
  "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&q=75",
  "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=75",
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=75",
];

export default function HomePage() {
  const [galleryImages, setGalleryImages]     = useState<any[]>([]);
  const [testimonialIdx, setTestimonialIdx]   = useState(0);

  useEffect(() => {
    fetch("/api/gallery")
      .then(res => res.json())
      .then(data => setGalleryImages(data.slice(0, 6)))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIdx(i => (i + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className={styles.main}>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <div className={styles.heroTag}>
            <span className={styles.heroTagLine} />
            Crafting Memories Since 2015
          </div>

          <h1 className={styles.heroTitle}>
            Every Occasion<br />
            Deserves to be<br />
            <em className={styles.heroTitleAccent}>Extraordinary</em>
          </h1>

          <p className={styles.heroSub}>
            From intimate birthday gatherings to grand wedding receptions —
            we design events that linger long after the last dance.
          </p>

          <div className={styles.heroButtons}>
            <Link href="/booking" className={styles.btnPrimary}>Plan Your Event</Link>
            <Link href="/gallery" className={styles.btnOutline}>View Our Work</Link>
          </div>

          <div className={styles.heroStats}>
            {STATS.map(s => (
              <div key={s.label}>
                <div className={styles.heroStatNum}>{s.num}</div>
                <div className={styles.heroStatLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.heroRight}>
          <div className={styles.heroImageGrid}>
            {HERO_IMAGES.map((src, i) => (
              <div key={i} className={styles.heroImageCell}>
                <img src={src} alt="" />
              </div>
            ))}
          </div>
          <div className={styles.heroGradient} />
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className={styles.services}>
        <div className={styles.servicesInner}>
          <div className={styles.sectionTag}>What We Offer</div>
          <h2 className={styles.sectionHeading}>
            Celebrations{" "}
            <em className={styles.sectionHeadingAccent}>Tailored</em>
            {" "}to Every Vision
          </h2>
          <div className={styles.servicesGrid}>
            {SERVICES.map(s => (
              <div
                key={s.name}
                className={styles.serviceCard}
                onClick={() => window.location.href = "/booking"}
              >
                <div className={styles.serviceIcon}>{s.icon}</div>
                <div className={styles.serviceName}>{s.name}</div>
                <p className={styles.serviceDesc}>{s.desc}</p>
                <div className={styles.servicePrice}>{s.price} · Book →</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY PREVIEW ── */}
      {galleryImages.length > 0 && (
        <section className={styles.gallerySection}>
          <div className={styles.galleryInner}>
            <div className={styles.galleryHeader}>
              <div>
                <div className={styles.galleryTagLight}>Our Portfolio</div>
                <h2 className={styles.galleryHeading}>
                  Every Event,{" "}
                  <em className={styles.galleryHeadingAccent}>a Story</em>
                </h2>
              </div>
              <Link href="/gallery" className={styles.galleryViewAll}>
                View All →
              </Link>
            </div>

            <div className={styles.galleryGrid}>
              {galleryImages.map((img) => (
                <div key={img.id} className={styles.galleryItem}>
                  <img src={img.url} alt={img.category} />
                  <div className={styles.galleryItemOverlay}>
                    <span className={styles.galleryItemCategory}>{img.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── TESTIMONIALS ── */}
      <section className={styles.testimonialsSection}>
        <div className={styles.testimonialsInner}>
          <div className={styles.sectionTag}>Client Stories</div>
          <h2 className={styles.sectionHeading} style={{ marginBottom: "3rem" }}>
            Moments That{" "}
            <em className={styles.sectionHeadingAccent}>Matter</em>
          </h2>

          <div className={styles.testimonialQuoteMark}>&ldquo;</div>
          <p className={styles.testimonialText}>
            {TESTIMONIALS[testimonialIdx].text}
          </p>
          <div className={styles.testimonialAuthor}>
            {TESTIMONIALS[testimonialIdx].author}
          </div>
          <div className={styles.testimonialEvent}>
            {TESTIMONIALS[testimonialIdx].event}
          </div>

          <div className={styles.testimonialDots}>
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setTestimonialIdx(i)}
                className={`${styles.testimonialDot} ${i === testimonialIdx ? styles.testimonialDotActive : ""}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <div>
            <h2 className={styles.ctaHeading}>
              Ready to plan your{" "}
              <em className={styles.ctaHeadingAccent}>celebration?</em>
            </h2>
            <p className={styles.ctaSub}>
              Let&apos;s create something extraordinary together.
            </p>
          </div>
          <Link href="/booking" className={styles.ctaButton}>
            Book Your Event ✦
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerGrid}>
            <div>
              <div className={styles.footerLogo}>
                Celebra<span className={styles.footerLogoAccent}>.</span>
              </div>
              <p className={styles.footerTagline}>
                Creating extraordinary celebrations for life&apos;s most
                meaningful milestones — since 2015.
              </p>
            </div>
            <div>
              <div className={styles.footerColTitle}>Navigate</div>
              {[
                { href: "/",        label: "Home" },
                { href: "/gallery", label: "Gallery" },
                { href: "/booking", label: "Booking" },
              ].map(l => (
                <Link key={l.href} href={l.href} className={styles.footerLink}>{l.label}</Link>
              ))}
            </div>
            <div>
              <div className={styles.footerColTitle}>Services</div>
              {["Weddings", "Birthdays", "Private Events", "Galas"].map(l => (
                <span key={l} className={styles.footerLink}>{l}</span>
              ))}
            </div>
            <div>
              <div className={styles.footerColTitle}>Contact</div>
              {["hello@celebra.ph", "+63 2 8888 0001", "Dasmariñas, Cavite", "Mon–Sat, 9am–6pm"].map(l => (
                <span key={l} className={styles.footerLink}>{l}</span>
              ))}
            </div>
          </div>

          <div className={styles.footerBottom}>
            <div className={styles.footerCopy}>
              © 2025 Celebra Events. All rights reserved.
            </div>
            <div className={styles.footerSocials}>
              {["fb", "ig", "in"].map(s => (
                <span key={s} className={styles.footerSocialIcon}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>

    </main>
  );
}