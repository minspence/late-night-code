import type { Metadata } from "next"
import Link from "next/link"
import { sanityFetch } from "@/sanity/lib/live"
import { POSTS_QUERY, ALL_CATEGORIES_QUERY } from "@/sanity/lib/queries"
import PostCard from "@/app/components/PostCard"

export const metadata: Metadata = {
  title: "All Posts | Late Night Code",
  description:
    "Browse all articles on web development, design, application development, and the developer lifestyle from Late Night Code.",
  alternates: { canonical: "https://late-night-code.midnight-code.tech/posts" },
  openGraph: {
    title: "All Posts | Late Night Code",
    description:
      "Browse all articles on web development, design, application development, and the developer lifestyle from Late Night Code.",
    url: "https://late-night-code.midnight-code.tech/posts",
    type: "website",
  },
}

export default async function PostsPage() {
  const [{ data: posts }, { data: categories }] = await Promise.all([
    sanityFetch({ query: POSTS_QUERY }),
    sanityFetch({ query: ALL_CATEGORIES_QUERY }),
  ])

  return (
    <main className="container mx-auto max-w-7xl px-5 py-16 md:py-20">
      <div className="mb-10">
        <Link href="/" className="font-mono text-sm text-gray-400 hover:text-white transition-colors">
          ← Back home
        </Link>
        <h1 className="font-bold text-4xl md:text-5xl mt-4 mb-2">All Posts</h1>
        <p className="font-mono text-gray-400 text-sm">
          {posts.length} {posts.length === 1 ? "article" : "articles"}
        </p>
      </div>

      {/* Category filter links */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10">
          <Link
            href="/posts"
            className="rounded-full px-3 py-1 text-xs font-mono border border-blue-200/30 bg-blue-200/10 text-blue-200 hover:bg-blue-200/20 transition-colors"
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat._id}
              href={`/posts/category/${cat.slug?.current}`}
              className="rounded-full px-3 py-1 text-xs font-mono border border-white/10 text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
            >
              {cat.title}
            </Link>
          ))}
        </div>
      )}

      {posts.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post._id} {...post} />
          ))}
        </div>
      ) : (
        <p className="font-mono text-gray-400">No posts yet — check back soon.</p>
      )}
    </main>
  )
}
