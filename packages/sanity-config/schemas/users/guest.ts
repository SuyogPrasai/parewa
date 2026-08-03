import { defineField, defineType } from 'sanity'
import { User } from 'lucide-react'

export default defineType({
  name: 'guest',
  title: 'Guest',
  icon: User,
  type: 'document',
  preview: {
    select: {
      title: 'fullName',
      subtitle: 'organization',
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contactNumber',
      title: 'Contact Number',
      type: 'string',
    }),
    defineField({
      name: 'organization',
      title: 'Organization',
      type: 'string',
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
    }),
    
    // Access
    defineField({
      name: 'role',
      title: 'Role',
      type: 'reference',
      to: { type: 'role' },
      initialValue: {
        _ref: 'guest',
      },
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
  ],
})
