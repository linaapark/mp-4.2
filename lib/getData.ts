//import {headers} from "next/headers";

const API_KEY = process.env.ART_API_KEY;

export default async function getData() {

    const res = await fetch(
        "https://api.artsearch.io/artworks?query=medieval+knights&number=3",
        {
            headers: {
                "x-api-key": API_KEY || "",
            }
        }
    );

    if (!res.ok) {
        // Proper error handling per project requirements
        throw new Error(`API error: ${res.status}`);
    }

    return res.json();
}
