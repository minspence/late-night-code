import { type SchemaTypeDefinition } from 'sanity'
import {postType} from "@/sanity/schemaTypes/postType";
import {authorType} from "@/sanity/schemaTypes/authorType";
import {categoryType} from "@/sanity/schemaTypes/categoryType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [ postType, authorType, categoryType,],
}
