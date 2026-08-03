import { defineField, defineType } from 'sanity'
import { Users } from 'lucide-react'

export default defineType({
  name: 'alumni',
  title: 'Alumni',
  icon: Users,
  type: 'document',
  preview: {
    select: {
      name: 'fullName',
      roll: 'roll',
      subtitle: 'graduatedYear',
      media: 'displayPicture',
    },
    prepare({ name, roll, subtitle, media }) {
      return {
        title: `${roll} · ${name}`,
        subtitle: `Graduated in ${subtitle}`,
        media,
      }
    },
  },
  fields: [
    // Identity
    defineField({
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'contactNumber',
      title: 'Contact Number',
      type: 'string',
    }),
    defineField({
      name: 'batch',
      title: 'Batch',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'graduatedYear',
      title: 'Graduated Year (B.S)',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(1900).max(2100),
    }),
    defineField({
      name: 'roll',
      title: 'Roll Number',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    
    // Access
    defineField({
      name: 'role',
      title: 'Role',
      type: 'reference',
      to: { type: 'role' },
      initialValue: {
        _ref: 'alumni',
      },
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
    }),
    defineField({
      name: 'displayPicture',
      title: 'Display Picture',
      type: 'image',
      options: {
        hotspot: true
      }
    })
  ],
})
