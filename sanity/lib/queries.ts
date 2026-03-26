import { defineQuery } from 'next-sanity'

export const POST_QUERY = defineQuery(
    `*[_type == "post" && slug.current == $slug][0]{
    title, body, mainImage
  }`
)

export const POSTS_QUERY = defineQuery(`*[_type == "post"]{_id, title, slug}`)