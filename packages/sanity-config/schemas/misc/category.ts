import { defineField, defineType } from 'sanity'
import { Tag } from 'lucide-react'

export default defineType({
  name: 'category',
  title: 'Category',
  icon: Tag,
  type: 'document',
  fields: [
    // Identity
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    
    // Description
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],
})
