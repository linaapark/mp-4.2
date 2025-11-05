import Image from "next/image";
import getRandomArtwork from "@/lib/getRandomArtwork";
import { ArtTypes } from "@/types/ArtTypes";

export default async function RandomPage() {
    let art: ArtTypes | null = null;
    let errorMessage: string | null = null;

    try {
        art = await getRandomArtwork();
    } catch (error) {
        errorMessage = (error as Error).message;
    }

    if (errorMessage) {
        return (
            <div className="p-8 text-center text-red-600">
                Error loading random artwork: {errorMessage}
            </div>
        );
    }

    if (!art) {
        // ✅ If null, return a safe fallback
        return (
            <div className="p-8 text-center text-gray-600">
                No artwork found.
            </div>
        );
    }

    // ✅ After this line, TypeScript *knows* art is not null.
    return (
        <div className="p-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-4 text-center">Random Artwork</h1>

            <div className="border rounded-xl shadow p-6 bg-white">
                <h2 className="text-2xl font-semibold mb-3">{art.title}</h2>

                <Image
                    src={art.image}
                    alt={art.title}
                    width={500}
                    height={500}
                    className="rounded-lg mb-4"
                />

                <p className="text-gray-700 mb-2">
                    <strong>Creation Date:</strong> {art.start_date}–{art.end_date}
                </p>

                <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                    {art.description}
                </p>
            </div>
        </div>
    );
}
