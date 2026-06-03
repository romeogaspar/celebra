"use client";
import { useState, useEffect } from "react";
import styles from "./Booking.module.css";

const PACKAGES = [
  { name: "Classic",   price: "From ₱28,000", desc: "4hr coverage, basic décor, coordination" },
  { name: "Signature", price: "From ₱55,000", desc: "8hr coverage, custom styling, full vendor mgmt" },
  { name: "Prestige",  price: "From ₱95,000", desc: "Full-day, bespoke design, premium catering" },
];

export default function BookingPage() {
  const [step, setStep]                 = useState(1);
  const [selectedPkg, setSelectedPkg]   = useState("");
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const [loading, setLoading]           = useState(false);
  const [done, setDone]                 = useState(false);
  const [form, setForm] = useState({
    clientName: "",
    email:      "",
    phone:      "",
    eventType:  "",
    eventDate:  "",
    guests:     "",
    message:    "",
  });

  useEffect(() => {
    fetch("/api/availability")
      .then(res => res.json())
      .then(data => setBlockedDates(data.map((d: any) => d.date)))
      .catch(() => {});
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          ...form,
          package: selectedPkg,
          guests:  Number(form.guests),
        }),
      });
      if (res.ok) setDone(true);
      else alert("Something went wrong. Please try again.");
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setDone(false);
    setStep(1);
    setSelectedPkg("");
    setForm({ clientName: "", email: "", phone: "", eventType: "", eventDate: "", guests: "", message: "" });
  };

  if (done) {
    return (
      <div className={styles.success}>
        <div className={styles.successInner}>
          <span className={styles.successIcon}>✦</span>
          <h2 className={styles.successTitle}>Enquiry Received</h2>
          <p className={styles.successText}>
            Thank you! Our team will review your request and get back to you within 24 hours.
          </p>
          <button className={styles.btnFull} onClick={resetForm}>
            Submit Another Enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.inner}>

        <h1 className={styles.title}>Book an Event</h1>
        <p className={styles.stepLabel}>Step {step} of 3</p>

        {/* Step indicator */}
        <div className={styles.stepBar}>
          {[1, 2, 3].map(s => (
            <div
              key={s}
              className={`${styles.stepBarItem} ${step >= s ? styles.stepBarItemActive : ""}`}
            />
          ))}
        </div>

        {/* ── STEP 1 — Package ── */}
        {step === 1 && (
          <div>
            <h3 style={{ marginBottom: "1.5rem", fontFamily: "Georgia, serif", fontSize: "1.3rem", fontWeight: 400 }}>
              Choose Your Package
            </h3>

            {PACKAGES.map(p => (
              <div
                key={p.name}
                className={`${styles.packageCard} ${selectedPkg === p.name ? styles.packageCardActive : ""}`}
                onClick={() => setSelectedPkg(p.name)}
              >
                <div className={styles.packageCardHeader}>
                  <strong className={styles.packageName}>{p.name}</strong>
                  <span className={styles.packagePrice}>{p.price}</span>
                </div>
                <p className={styles.packageDesc}>{p.desc}</p>
              </div>
            ))}

            <div className={styles.fieldWrap} style={{ marginTop: "1.5rem" }}>
              <label className={styles.fieldLabel}>Event Type</label>
              <select
                className={styles.fieldInput}
                value={form.eventType}
                onChange={e => setForm({ ...form, eventType: e.target.value })}
              >
                <option value="">Select event type</option>
                <option>Wedding</option>
                <option>Birthday</option>
                <option>Private Party</option>
                <option>Anniversary</option>
                <option>Debut</option>
              </select>
            </div>

            <button
              className={styles.btnFull}
              onClick={() => { if (selectedPkg && form.eventType) setStep(2); }}
            >
              Continue →
            </button>
          </div>
        )}

        {/* ── STEP 2 — Event Details ── */}
        {step === 2 && (
          <div>
            <h3 style={{ marginBottom: "1.5rem", fontFamily: "Georgia, serif", fontSize: "1.3rem", fontWeight: 400 }}>
              Event Details
            </h3>

            <div className={styles.fieldWrap}>
              <label className={styles.fieldLabel}>Preferred Date</label>
              <input
                type="date"
                className={styles.fieldInput}
                value={form.eventDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={e => {
                  if (blockedDates.includes(e.target.value)) {
                    alert("This date is unavailable. Please choose another date.");
                    return;
                  }
                  setForm({ ...form, eventDate: e.target.value });
                }}
              />
              {blockedDates.length > 0 && (
                <p className={styles.fieldHint}>Some dates may be unavailable.</p>
              )}
            </div>

            <div className={styles.fieldWrap}>
              <label className={styles.fieldLabel}>Estimated Guests</label>
              <input
                type="number"
                className={styles.fieldInput}
                placeholder="e.g. 80"
                value={form.guests}
                onChange={e => setForm({ ...form, guests: e.target.value })}
              />
            </div>

            <div className={styles.fieldWrap}>
              <label className={styles.fieldLabel}>Tell us about your vision</label>
              <textarea
                className={styles.fieldTextarea}
                placeholder="Theme, mood, special requirements..."
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
              />
            </div>

            <div className={styles.btnRow}>
              <button className={styles.btnOutline} onClick={() => setStep(1)}>← Back</button>
              <button
                className={styles.btnPrimary}
                onClick={() => { if (form.eventDate && form.guests) setStep(3); }}
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3 — Contact Details ── */}
        {step === 3 && (
          <div>
            <h3 style={{ marginBottom: "1.5rem", fontFamily: "Georgia, serif", fontSize: "1.3rem", fontWeight: 400 }}>
              Your Contact Details
            </h3>

            <div className={styles.fieldWrap}>
              <label className={styles.fieldLabel}>Full Name</label>
              <input
                className={styles.fieldInput}
                placeholder="Jane Smith"
                value={form.clientName}
                onChange={e => setForm({ ...form, clientName: e.target.value })}
              />
            </div>

            <div className={styles.fieldWrap}>
              <label className={styles.fieldLabel}>Email Address</label>
              <input
                type="email"
                className={styles.fieldInput}
                placeholder="jane@example.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className={styles.fieldWrap}>
              <label className={styles.fieldLabel}>Phone Number</label>
              <input
                type="tel"
                className={styles.fieldInput}
                placeholder="+63 9XX XXX XXXX"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
              />
            </div>

            <div className={styles.summary}>
              <strong className={styles.summaryTitle}>Summary</strong>
              {selectedPkg} package · {form.eventType} · {form.eventDate} · {form.guests} guests
            </div>

            <div className={styles.btnRow}>
              <button className={styles.btnOutline} onClick={() => setStep(2)}>← Back</button>
              <button
                className={styles.btnPrimary}
                onClick={() => { if (form.clientName && form.email) handleSubmit(); }}
                disabled={loading}
              >
                {loading ? "Submitting…" : "Submit Enquiry ✦"}
              </button>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}