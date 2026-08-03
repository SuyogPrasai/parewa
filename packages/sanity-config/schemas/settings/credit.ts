import { defineField, defineType } from 'sanity'
import { User } from 'lucide-react'

export default defineType({
  name: 'credit',
  title: 'Credits',
  type: 'document',
  icon: User,
  fields: [
    // Profile
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'roll',
      title: 'Roll',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    
    // Media
    defineField({
      name: 'displayPicture',
      title: 'Display Picture',
      type: 'image',
      options: {
        hotspot: true
      }
    })
  ],
  preview: {
    select: {
      name: 'name',
      roll: 'roll',
      media: 'displayPicture',
    },
    prepare({ name, roll, media }) {
      return {
        title: `${roll} · ${name}`,
        media,
      }
    },
  },
})