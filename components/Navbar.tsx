import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="p-4 bg-gray-800 text-white flex gap-6">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/about" className="hover:underline">About</Link>
            <Link href="/random" className="hover:underline">Random Artwork</Link>
        </nav>
    );
}
