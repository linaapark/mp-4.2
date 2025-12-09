import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "20");

        // Fetch from AIC API
        const res = await fetch(
            `https://api.artic.edu/api/v1/artworks?page=${page}&limit=${limit}&fields=id,title,image_id`
        );

        if (!res.ok) {
            throw new Error(`AIC API error: ${res.status}`);
        }

        const data = await res.json();

        // Filter artworks that have images
        const artworksWithImages = data.data.filter((a: any) => a.image_id);

        return NextResponse.json(artworksWithImages);
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
