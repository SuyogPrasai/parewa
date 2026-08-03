import { defineField, defineType } from 'sanity'
import { Calendar } from 'lucide-react'

export default defineType({
  name: 'event',
  title: 'Event',
  icon: Calendar,
  type: 'document',
  groups: [
    { name: 'general', title: 'General' },
    { name: 'details', title: 'Details' },
  ],
  fields: [
    // General
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required().min(3),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    
    // Details
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      group: 'details',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        timeStep: 15,
        displayTimeZone: 'Asia/Kathmandu'
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      group: 'details',
      validation: (Rule) => Rule.required(),
    })
  ],
})
