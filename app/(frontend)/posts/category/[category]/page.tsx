import type { Metadata } from "next"
import Link from "next/link"
import { sanityFetch } from "@/sanity/lib/live"
import { POSTS_BY_CATEGORY_QUERY, ALL_CATEGORIES_QUERY } from "@/sanity/lib/queries"
import PostCard from "@/app/components/PostCard"

type Props = { params: Promise<{ category: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const label = category
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")

  return {
    title: `${label} | Late Night Code`,
    description: `Browse all ${label} articles on Late Night Code.`,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params

  const [{ data: posts }, { data: categories }] = await Promise.all([
    sanityFetch({ query: POSTS_BY_CATEGORY_QUERY, params: { category } }),
    sanityFetch({ query: ALL_CATEGORIES_QUERY }),
  ])

  const currentCategory = categories.find((c) => c.slug?.current === category)

  return (
    <main className="container mx-auto max-w-7xl px-5 py-16 md:py-20">
      <div className="mb-10">
        <Link href="/posts" className="font-mono text-sm text-gray-400 hover:text-white transition-colors">
          ← All posts
        </Link>
        <h1 className="font-bold text-4xl md:text-5xl mt-4 mb-2">
          {currentCategory?.title ?? category}
        </h1>
        <p className="font-mono text-gray-400 text-sm">
          {posts.length} {posts.length === 1 ? "article" : "articles"}
        </p>
      </div>

      {/* Category filter links */}
      <div className="flex flex-wrap gap-2 mb-10">
        <Link
          href="/posts"
          className="rounded-full px-3 py-1 text-xs font-mono border border-white/10 text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
        >
          All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat._id}
            href={`/posts/category/${cat.slug?.current}`}
            className={[
              "rounded-full px-3 py-1 text-xs font-mono border transition-colors",
              cat.slug?.current === category
                ? "border-blue-200/30 bg-blue-200/10 text-blue-200"
                : "border-white/10 text-gray-300 hover:bg-white/5 hover:text-white",
            ].join(" ")}
          >
            {cat.title}
          </Link>
        ))}
      </div>

      {posts.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post._id} {...post} />
          ))}
        </div>
      ) : (
        <p className="font-mono text-gray-400">No posts in this category yet.</p>
      )}
    </main>
  )
}
