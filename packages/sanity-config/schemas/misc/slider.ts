import { defineField, defineType } from 'sanity'
import { Image } from 'lucide-react'

export default defineType({
  name: 'slider',
  title: 'Slider',
  icon: Image,
  type: 'document',
  fields: [
    // Slide content
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
    }),
    
    // Media
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    })
  ],
})
