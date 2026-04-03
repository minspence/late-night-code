import Image from "next/image"
import Link from "next/link"
import { urlFor } from "@/sanity/lib/image"

type PostCardProps = {
  _id: string
  title: string | null
  slug: { current?: string | null } | null
  excerpt?: string | null
  publishedAt?: string | null
  mainImage?: { asset?: { _ref: string; _type: string } | null; alt?: string | null; [key: string]: unknown } | null
  category?: { title: string | null; slug: { current?: string | null } | null } | null
  author?: { name: string | null } | null
}

function formatDate(dateString: string | null | undefined) {
  if (!dateString) return null
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default function PostCard({ _id, title, slug, excerpt, publishedAt, mainImage, category, author }: PostCardProps) {
  const href = `/posts/${slug?.current ?? ""}`

  return (
    <article key={_id} className="flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
      {mainImage?.asset && (
        <Link href={href} className="block overflow-hidden">
          <Image
            src={urlFor(mainImage).width(800).height(450).url()}
            alt={mainImage.alt ?? title ?? "Post image"}
            width={800}
            height={450}
            className="w-full object-cover aspect-video"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
      )}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="flex items-center gap-3 text-xs font-mono text-gray-300">
          {category?.title && (
            <span className="rounded-full px-2.5 py-0.5 bg-blue-200/10 text-blue-200 border border-blue-200/20">
              {category.title}
            </span>
          )}
          {formatDate(publishedAt) && (
            <time dateTime={publishedAt ?? undefined}>{formatDate(publishedAt)}</time>
          )}
        </div>
        <Link href={href}>
          <h2 className="font-bold text-lg leading-snug hover:text-blue-200 transition-colors">
            {title}
          </h2>
        </Link>
        {excerpt && (
          <p className="font-mono text-sm text-gray-300 line-clamp-3">{excerpt}</p>
        )}
        <div className="mt-auto pt-3 flex items-center justify-between">
          {author?.name && (
            <span className="text-xs text-gray-400 font-mono">{author.name}</span>
          )}
          <Link
            href={href}
            className="ml-auto text-xs font-semibold text-blue-200 hover:text-blue-400 transition-colors"
          >
            Read more →
          </Link>
        </div>
      </div>
    </article>
  )
}
