import { defineField, defineType, ReferenceFilterResolverContext } from 'sanity'
import { User } from 'lucide-react'

export default defineType({
  name: 'student',
  title: 'Student',
  icon: User,
  type: 'document',
  preview: {
    select: {
      name: 'fullName',
      subtitle: 'house.name',
      roll: 'roll',
      media: 'displayPicture',
    },
    prepare({ name, roll, subtitle, media }) {
      return {
        title: `${roll} · ${name}`,
        media,
        subtitle,
      }
    },
  },
  fields: [
    // Identity
    defineField({
      name: 'fullName',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: 'roll',
      title: 'Roll Number',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'batch',
      title: 'Batch',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    // Relationships
    defineField({
      name: 'house',
      title: 'House',
      type: 'reference',
      to: { type: 'house' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'reference',
      to: { type: 'role' },
      initialValue: {
        _ref: 'student',
      },
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'email',
    }),
    defineField({
      name: 'grade',
      title: 'Grade',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'position',
      title: 'Position',
      type: 'reference',
      to: { type: 'position' },
      options: {
        filter: (context: ReferenceFilterResolverContext) => {
          const doc = context.document as { role?: { _ref?: string } }
          const roleRef = doc.role?._ref
          if (!roleRef) {
            return {
              filter: 'defined(role)'
            }
          }
          return {
            filter: 'role._ref == $roleId',
            params: { roleId: roleRef },
          }
        }
      }
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
})
