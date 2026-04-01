import { SanityLive } from "@/sanity/lib/live";
import Navbar from "../components/navbar";

export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      {children}
      <SanityLive />
    </div>
  );
}
