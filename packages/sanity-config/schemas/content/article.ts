import { defineField, defineType } from 'sanity'
import { FileText } from 'lucide-react'

export default defineType({
  name: 'article',
  title: 'Article',
  icon: FileText,
  type: 'document',
  groups: [
    { name: 'general', title: 'General' },
    { name: 'content', title: 'Content' },
    { name: 'media', title: 'Media' },
    { name: 'taxonomy', title: 'Taxonomy' },
    { name: 'publishing', title: 'Publishing' },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'featuredImage',
    },
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required().min(3),
    }),

    // General
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'oneLiner',
      title: 'One Liner',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    
    // Content
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      group: 'media',
      options: {
        hotspot: true,
      },
    }),

    // Media
    defineField({
      name: 'imageDescription',
      title: 'Image Description',
      type: 'string',
      group: 'media',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      group: 'taxonomy',
      validation: (Rule) => Rule.required(),
    }),

    // Taxonomy
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [
        { type: 'student' },
        { type: 'teacher' },
        { type: 'alumni' },
      ],
      group: 'taxonomy',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'string',
          options: {
            layout: 'tags',
          },
        }
      ],
      options: {
        layout: 'tags',
      },
      validation: (Rule) =>
        Rule.custom((tags: string[] | undefined) => {
          if (!tags) return true
          const invalid = tags.filter(
            (tag) => !/^#[a-z0-9]+(-[a-z0-9]+)*$/.test(tag)
          )
          if (invalid.length > 0) {
            return `Tags must start with # and be slug-formatted (e.g. #club-event). Invalid: ${invalid.join(', ')}`
          }
          return true
        }),
    }),

    // Publishing
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      group: 'publishing',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
