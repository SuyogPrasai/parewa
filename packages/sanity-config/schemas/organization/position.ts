import { defineField, defineType } from 'sanity'
import { Briefcase } from 'lucide-react'

export default defineType({
  name: 'position',
  title: 'Position',
  icon: Briefcase,
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
    defineField({
      name: 'role',
      title: 'Role',
      type: 'reference',
      to: [{ type: 'role' }],
    }),
    
    // Details
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],
})
