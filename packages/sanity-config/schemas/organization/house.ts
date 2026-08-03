import { defineField, defineType } from 'sanity'
import { Home } from 'lucide-react'

export default defineType({
  name: 'house',
  title: 'House',
  icon: Home,
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
    
    // Details
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],
})
