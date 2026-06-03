"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Gallery.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:       "Gallery — Celebra Events",
  description: "Browse our portfolio of weddings, birthdays, and private celebrations. Every event tells a story.",
};

type GalleryImage = {
  id: string;
  url: string;
  width: number;
  height: number;
  category: string;
};

const FILTERS = ["All", "Wedding", "Birthday", "Private Party"];

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        setImages(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered =
    filter === "All"
      ? images
      : images.filter(
          (img) =>
            img.category.toLowerCase() === filter.toLowerCase() ||
            img.id
              .toLowerCase()
              .includes(filter.toLowerCase().replace(" ", "_")),
        );

  return (
    <main className={styles.main}>
      {/* Header */}
      <div className={styles.header}>
        <p className={styles.tag}>Our Portfolio</p>
        <h1 className={styles.title}>Every Event, a Story</h1>

        <div className={styles.filters}>
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`${styles.filterBtn} ${filter === f ? styles.filterBtnActive : ""}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className={styles.gridWrap}>
        {loading ? (
          <div className={styles.empty}>Loading gallery…</div>
        ) : filtered.length === 0 ? (
          <div className={styles.empty}>
            {images.length === 0
              ? "No images yet. Upload photos to your Cloudinary celebra folder to get started."
              : `No ${filter} images found.`}
          </div>
        ) : (
          <div className={styles.grid}>
            {filtered.map((img) => (
              <div
                key={img.id}
                className={styles.gridItem}
                onClick={() => setLightbox(img)}
              >
                <Image
                  src={img.url}
                  alt={img.category}
                  width={img.width}
                  height={img.height}
                  style={{ width: "100%", height: "auto" }}
                />
                <div className={styles.gridItemOverlay}>
                  <span className={styles.gridItemCategory}>
                    {img.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className={styles.lightboxBackdrop}
          onClick={() => setLightbox(null)}
        >
          <button
            className={styles.lightboxClose}
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>
          <Image
            src={lightbox.url}
            alt={lightbox.category}
            className={styles.lightboxImg}
            onClick={(e) => e.stopPropagation()}
          />
          <div className={styles.lightboxCaption}>{lightbox.category}</div>
        </div>
      )}
    </main>
  );
}
