"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./AdminLogin.module.css";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const router                  = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin-login", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push("/admin");
      } else {
        setError("Incorrect password. Please try again.");
      }
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <h1 className={styles.title}>Celebra Admin</h1>
        <p className={styles.subtitle}>
          Enter your admin password to continue.
        </p>

        <label className={styles.label}>Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleLogin()}
          placeholder="Enter admin password"
          className={styles.input}
        />

        {error && <p className={styles.error}>{error}</p>}

        <button
          onClick={handleLogin}
          disabled={loading || !password}
          className={styles.btn}
        >
          {loading ? "Verifying…" : "Login →"}
        </button>
      </div>
    </main>
  );
}