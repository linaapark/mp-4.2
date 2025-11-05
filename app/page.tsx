import Image from "next/image";
import getData from "@/lib/getData";
import { ArtTypes } from "@/types/ArtTypes";

import Link from "next/link";

export default async function Home() {
    try {
        const data = await getData();
        const arts: ArtTypes[] = Array.isArray(data.artworks) ? data.artworks : [];

        return (
            // similar to discusdsion formatting
            <div className={"grid grid-cols-3 gap-4 p-4"}>
                {arts.map((art) => (
                    <div key={art.id} className="border rounded-xl shadow p-4">
                        <h2 className="font-bold mb-2">{art.title}</h2>
                        <Image
                            src={art.image}
                            alt={art.title}
                            width={300}
                            height={300}
                            className="rounded-lg"
                        />
                    </div>
                ))}
            </div>
        );
    } catch (error) {
        return (
            <div className="p-4 text-red-600">
                Error loading artworks: {(error as Error).message}
            </div>
        );
    }
}
