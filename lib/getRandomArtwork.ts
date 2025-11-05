// lib/getRandomArtwork.ts

const API_KEY = process.env.ART_API_KEY;

export default async function getRandomArtwork() {
    const res = await fetch("https://api.artsearch.io/artworks/random", {
        headers: {
            "x-api-key": API_KEY || "",
        },
        cache: "no-store", // ensures it fetches a fresh random artwork each time
    });

    if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
    }

    return res.json();
}
