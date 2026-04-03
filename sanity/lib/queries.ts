import { defineQuery } from 'next-sanity'

export const FEATURED_POSTS_QUERY = defineQuery(`
  *[_type == "post" && featured == true] | order(publishedAt desc)[0...6]{
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage,
    "category": category->{title, slug},
    "author": author->{name}
  }
`)

export const POSTS_QUERY = defineQuery(`
  *[_type == "post"] | order(publishedAt desc){
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage,
    "category": category->{title, slug},
    "author": author->{name}
  }
`)

export const POSTS_BY_CATEGORY_QUERY = defineQuery(`
  *[_type == "post" && category->slug.current == $category] | order(publishedAt desc){
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage,
    "category": category->{title, slug},
    "author": author->{name}
  }
`)

export const POST_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage,
    body,
    "category": category->{title, slug},
    "author": author->{name, image, bio},
    seo
  }
`)

export const ALL_CATEGORIES_QUERY = defineQuery(`
  *[_type == "category"] | order(title asc){
    _id,
    title,
    slug
  }
`)
