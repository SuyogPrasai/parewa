import { defineField, defineType } from 'sanity'
import { Link } from 'lucide-react'

export default defineType({
  name: 'link',
  title: 'Link',
  icon: Link,
  type: 'document',
  fields: [
    // Link metadata
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(2),
    }),
  
    // Display
    defineField({
      name: 'url',
      title: 'URL',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in New Tab',
      type: 'boolean',
    }),
  ],
})
