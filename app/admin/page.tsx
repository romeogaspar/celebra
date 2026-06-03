"use client";
import { useState, useEffect } from "react";
import styles from "./Admin.module.css";

type Booking = {
  id:         number;
  clientName: string;
  email:      string;
  phone:      string;
  eventType:  string;
  package:    string;
  eventDate:  string;
  guests:     number;
  message:    string;
  status:     string;
  createdAt:  string;
};

type TabType = "all" | "pending" | "confirmed" | "declined";

export default function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading]   = useState(true);
  const [selected, setSelected] = useState<Booking | null>(null);
  const [updating, setUpdating] = useState<number | null>(null);
  const [tab, setTab]           = useState<TabType>("all");

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res  = await fetch("/api/bookings");
      const data = await res.json();
      setBookings(data);
    } catch (e) {
      console.error("Failed to fetch bookings", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  const updateStatus = async (id: number, status: string) => {
    setUpdating(id);
    try {
      await fetch(`/api/bookings/${id}`, {
        method:  "PATCH",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ status }),
      });
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
      if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : null);
    } catch {
      alert("Failed to update booking.");
    } finally {
      setUpdating(null);
    }
  };

  const filtered = tab === "all"
    ? bookings
    : bookings.filter(b => b.status === tab);

  const stats = {
    total:     bookings.length,
    pending:   bookings.filter(b => b.status === "pending").length,
    confirmed: bookings.filter(b => b.status === "confirmed").length,
    declined:  bookings.filter(b => b.status === "declined").length,
  };

  const statusClass = (status: string) => {
    if (status === "confirmed") return styles.statusConfirmed;
    if (status === "declined")  return styles.statusDeclined;
    return styles.statusPending;
  };

  return (
    <main className={styles.main}>

      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.headerTitle}>Celebra Admin</h1>
          <p className={styles.headerSub}>Booking Management Dashboard</p>
        </div>
        <button className={styles.refreshBtn} onClick={fetchBookings}>
          ↻ Refresh
        </button>
      </div>

      <div className={styles.inner}>

        {/* Stats */}
        <div className={styles.stats}>
          {[
            { label: "Total Bookings",  value: stats.total,     color: "#C9A96E" },
            { label: "Pending Review",  value: stats.pending,   color: "#E2A84C" },
            { label: "Confirmed",       value: stats.confirmed, color: "#4CAF50" },
            { label: "Declined",        value: stats.declined,  color: "#EF5350" },
          ].map(s => (
            <div key={s.label} className={styles.statCard}>
              <div className={styles.statVal} style={{ color: s.color }}>{s.value}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          {(["all", "pending", "confirmed", "declined"] as TabType[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`${styles.tab} ${tab === t ? styles.tabActive : ""}`}
            >
              {t} {t !== "all" && `(${stats[t]})`}
            </button>
          ))}
        </div>

        {/* Layout */}
        <div className={`${styles.layout} ${selected ? styles.layoutWithPanel : ""}`}>

          {/* Table */}
          <div className={styles.tableWrap}>
            {loading ? (
              <p className={styles.empty}>Loading bookings…</p>
            ) : filtered.length === 0 ? (
              <p className={styles.empty}>
                No {tab === "all" ? "" : tab} bookings found.
              </p>
            ) : (
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["ID", "Client", "Event", "Date", "Guests", "Package", "Status", "Actions"].map(h => (
                      <th key={h} className={styles.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(b => (
                    <tr
                      key={b.id}
                      className={`${styles.tr} ${selected?.id === b.id ? styles.trSelected : ""}`}
                      onClick={() => setSelected(selected?.id === b.id ? null : b)}
                    >
                      <td className={styles.td}>
                        <span className={styles.bookingId}>#{b.id}</span>
                      </td>
                      <td className={styles.td}>
                        <div className={styles.clientName}>{b.clientName}</div>
                        <div className={styles.clientEmail}>{b.email}</div>
                      </td>
                      <td className={styles.td}>{b.eventType}</td>
                      <td className={styles.td} style={{ whiteSpace: "nowrap" }}>{b.eventDate}</td>
                      <td className={styles.td}>{b.guests}</td>
                      <td className={styles.td}>{b.package}</td>
                      <td className={styles.td}>
                        <span className={`${styles.statusBadge} ${statusClass(b.status)}`}>
                          {b.status}
                        </span>
                      </td>
                      <td
                        className={styles.td}
                        style={{ whiteSpace: "nowrap" }}
                        onClick={e => e.stopPropagation()}
                      >
                        {b.status === "pending" && <>
                          <button
                            className={`${styles.actionBtn} ${styles.actionBtnApprove}`}
                            onClick={() => updateStatus(b.id, "confirmed")}
                            disabled={updating === b.id}
                          >
                            {updating === b.id ? "…" : "Approve"}
                          </button>
                          <button
                            className={`${styles.actionBtn} ${styles.actionBtnDecline}`}
                            onClick={() => updateStatus(b.id, "declined")}
                            disabled={updating === b.id}
                          >
                            Decline
                          </button>
                        </>}
                        {b.status !== "pending" && (
                          <button
                            className={`${styles.actionBtn} ${styles.actionBtnReset}`}
                            onClick={() => updateStatus(b.id, "pending")}
                          >
                            Reset
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Detail Panel */}
          {selected && (
            <div className={styles.panel}>
              <div className={styles.panelHeader}>
                <h3 className={styles.panelTitle}>Booking #{selected.id}</h3>
                <button className={styles.panelClose} onClick={() => setSelected(null)}>✕</button>
              </div>

              <span className={`${styles.statusBadge} ${statusClass(selected.status)}`}
                style={{ marginBottom: "1.5rem", display: "inline-block" }}>
                {selected.status}
              </span>

              {[
                { label: "Client",    value: selected.clientName },
                { label: "Email",     value: selected.email },
                { label: "Phone",     value: selected.phone },
                { label: "Event",     value: selected.eventType },
                { label: "Package",   value: selected.package },
                { label: "Date",      value: selected.eventDate },
                { label: "Guests",    value: String(selected.guests) },
                { label: "Submitted", value: new Date(selected.createdAt).toLocaleDateString("en-PH", { dateStyle: "medium" }) },
              ].map(row => (
                <div key={row.label} className={styles.panelRow}>
                  <span className={styles.panelRowLabel}>{row.label}</span>
                  <span className={styles.panelRowValue}>{row.value || "—"}</span>
                </div>
              ))}

              {selected.message && (
                <div className={styles.panelMessage}>
                  <div className={styles.panelMessageLabel}>Message</div>
                  <p className={styles.panelMessageText}>{selected.message}</p>
                </div>
              )}

              {selected.status === "pending" && (
                <div className={styles.panelActions}>
                  <button
                    className={styles.panelBtnApprove}
                    onClick={() => updateStatus(selected.id, "confirmed")}
                    disabled={updating === selected.id}
                  >
                    ✓ Approve
                  </button>
                  <button
                    className={styles.panelBtnDecline}
                    onClick={() => updateStatus(selected.id, "declined")}
                    disabled={updating === selected.id}
                  >
                    ✕ Decline
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}