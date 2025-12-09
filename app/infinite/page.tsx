"use client";

import { useState, useEffect } from "react";

// Helper to construct IIIF image URLs
function getImageUrl(image_id: string) {
    return `https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg`;
}

export default function InfiniteScrollPage() {
    const [artworks, setArtworks] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    async function loadMore() {
        if (loading || !hasMore) return;

        setLoading(true);

        try {
            const res = await fetch(
                `https://api.artic.edu/api/v1/artworks?page=${page}&limit=10&fields=id,title,image_id`
            );
            const data = await res.json();

            if (!data.data || data.data.length === 0) {
                setHasMore(false);
            } else {
                // Avoid duplicate keys by adding page index
                setArtworks((prev) => [...prev, ...data.data]);
                setPage((prev) => prev + 1);
            }
        } catch (err) {
            console.error(err);
            setHasMore(false);
        }

        setLoading(false);
    }

    useEffect(() => {
        loadMore();
    }, []);

    // Infinite scroll listener
    useEffect(() => {
        function handleScroll() {
            if (
                window.innerHeight + window.scrollY + 200 >=
                document.documentElement.scrollHeight
            ) {
                loadMore();
            }
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading, hasMore]);

    return (
        <div style={{ padding: "20px" }}>
            <h1>Infinite Scroll Artworks</h1>

            {artworks.map((a, index) => (
                <div key={`${a.id}-${index}`} style={{ marginBottom: "30px" }}>
                    {a.image_id ? (
                        <img
                            src={getImageUrl(a.image_id)}
                            alt={a.title}
                            style={{ width: 300, height: "auto", objectFit: "contain" }}
                            loading="lazy"
                        />
                    ) : (
                        <p>No image available</p>
                    )}
                    <p>{a.title}</p>
                </div>
            ))}

            {loading && <p>Loading more artworks...</p>}
            {!hasMore && <p>No more artworks available.</p>}
        </div>
    );
}
