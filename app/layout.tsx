import type {Metadata} from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
    title: "CS391 ArtSearch App",
    description: "Mini project using API with key",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <Navbar />
        {children}
        </body>
        </html>
    );
}