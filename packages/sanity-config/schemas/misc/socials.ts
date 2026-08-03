import { defineField, defineType } from 'sanity'
import { Globe } from 'lucide-react'

export default defineType({
  name: 'socials',
  title: 'Socials',
  icon: Globe,
  type: 'document',
  fields: [
    // Profile
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    
    // Display
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'icon',
    }),
  ],
})
