import type { Metadata } from "next"
import Link from "next/link"
import { sanityFetch } from "@/sanity/lib/live"
import { FEATURED_POSTS_QUERY } from "@/sanity/lib/queries"
import PostCard from "@/app/components/PostCard"

export const metadata: Metadata = {
  title: "Late Night Code | Web Development Blog",
  description:
    "A blog about web development, design, and application building by Midnight Code. Late-night thoughts on Next.js, Sanity, TypeScript, and the developer life.",
  alternates: { canonical: "https://late-night-code.midnight-code.tech" },
  openGraph: {
    title: "Late Night Code | Web Development Blog",
    description:
      "A blog about web development, design, and application building by Midnight Code. Late-night thoughts on Next.js, Sanity, TypeScript, and the developer life.",
    url: "https://late-night-code.midnight-code.tech",
    type: "website",
  },
}

export default async function HomePage() {
  const { data: featuredPosts } = await sanityFetch({ query: FEATURED_POSTS_QUERY })

  return (
    <main className="container mx-auto max-w-7xl px-5 py-16 md:py-20 lg:py-28">
      {/* Hero */}
      <section className="mb-16 md:mb-20">
        <h1 className="font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight mb-4">
          Late Night Code
        </h1>
        <p className="font-mono text-gray-300 text-sm md:text-base max-w-xl">
          &#34;The best ideas come after midnight.&#34; — Web development, design, and the
          developer life.
        </p>
        <div className="flex gap-4 mt-8">
          <Link
            href="/posts"
            className="bg-blue-200 hover:bg-blue-400 text-black font-bold py-2 px-5 rounded-md transition-colors text-sm"
          >
            All Posts
          </Link>
          <Link
            href="https://midnight-code.tech"
            className="border border-white/20 hover:bg-white/5 text-white font-bold py-2 px-5 rounded-md transition-colors text-sm"
          >
            Back to Midnight Code
          </Link>
        </div>
      </section>

      {/* Featured Posts */}
      <section>
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="font-bold text-2xl md:text-3xl">Featured Posts</h2>
          <Link
            href="/posts"
            className="font-mono text-sm text-blue-200 hover:text-blue-400 transition-colors"
          >
            View all →
          </Link>
        </div>

        {featuredPosts.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <PostCard key={post._id} {...post} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-white/10 bg-white/5 px-8 py-16 text-center">
            <p className="font-mono text-gray-400 mb-4">No featured posts yet.</p>
            <Link href="/posts" className="text-blue-200 hover:text-blue-400 font-mono text-sm transition-colors">
              Browse all posts →
            </Link>
          </div>
        )}
      </section>
    </main>
  )
}
