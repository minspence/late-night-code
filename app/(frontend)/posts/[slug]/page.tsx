import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PortableText } from "@portabletext/react"
import { sanityFetch } from "@/sanity/lib/live"
import { POST_QUERY } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data: post } = await sanityFetch({
    query: POST_QUERY,
    params: await params,
  })

  if (!post) return {}

  const title = post.seo?.metaTitle ?? post.title ?? "Post"
  const description = post.seo?.metaDescription ?? post.excerpt ?? undefined
  const ogImage = post.mainImage?.asset
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : undefined

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.publishedAt ?? undefined,
      authors: post.author?.name ? [post.author.name] : undefined,
      ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630 }] }),
    },
  }
}

function formatDate(dateString: string | null | undefined) {
  if (!dateString) return null
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default async function PostPage({ params }: Props) {
  const { data: post } = await sanityFetch({
    query: POST_QUERY,
    params: await params,
  })

  if (!post) notFound()

  return (
    <main className="container mx-auto max-w-3xl px-5 py-16 md:py-20">
      {/* Back link */}
      <Link
        href="/posts"
        className="font-mono text-sm text-gray-400 hover:text-white transition-colors mb-8 inline-block"
      >
        ← All posts
      </Link>

      {/* Category + date */}
      <div className="flex flex-wrap items-center gap-3 mt-4 mb-5 text-xs font-mono text-gray-400">
        {post.category?.title && (
          <Link
            href={`/posts/category/${post.category.slug?.current}`}
            className="rounded-full px-2.5 py-0.5 bg-blue-200/10 text-blue-200 border border-blue-200/20 hover:bg-blue-200/20 transition-colors"
          >
            {post.category.title}
          </Link>
        )}
        {post.publishedAt && (
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        )}
      </div>

      {/* Title */}
      <h1 className="font-bold text-4xl md:text-5xl text-balance leading-tight mb-5">
        {post.title}
      </h1>

      {/* Excerpt */}
      {post.excerpt && (
        <p className="font-mono text-gray-300 text-base mb-8 border-l-2 border-blue-200/40 pl-4">
          {post.excerpt}
        </p>
      )}

      {/* Author */}
      {post.author?.name && (
        <div className="flex items-center gap-3 mb-10 pb-10 border-b border-white/10">
          {post.author.image?.asset && (
            <Image
              src={urlFor(post.author.image).width(80).height(80).url()}
              alt={post.author.name}
              width={40}
              height={40}
              className="rounded-full"
            />
          )}
          <span className="font-mono text-sm text-gray-300">{post.author.name}</span>
        </div>
      )}

      {/* Main image */}
      {post.mainImage?.asset && (
        <div className="mb-10 rounded-xl overflow-hidden">
          <Image
            src={urlFor(post.mainImage).width(1200).height(675).url()}
            alt={post.mainImage.alt ?? post.title ?? "Post image"}
            width={1200}
            height={675}
            className="w-full object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
            priority
          />
        </div>
      )}

      {/* Body */}
      {post.body && (
        <div className="prose prose-invert prose-blue max-w-none font-mono prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-200 prose-code:text-magenta-200">
          <PortableText value={post.body} />
        </div>
      )}

      {/* Footer nav */}
      <div className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center">
        <Link href="/posts" className="font-mono text-sm text-gray-400 hover:text-white transition-colors">
          ← All posts
        </Link>
        <Link href="https://midnight-code.tech" className="font-mono text-sm text-gray-400 hover:text-white transition-colors">
          Midnight Code →
        </Link>
      </div>
    </main>
  )
}
