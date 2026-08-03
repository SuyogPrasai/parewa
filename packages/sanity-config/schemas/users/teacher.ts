import { defineField, defineType, ReferenceFilterResolverContext } from 'sanity'
import { User } from 'lucide-react'

export default defineType({
  name: 'teacher',
  title: 'Teacher',
  icon: User,
  type: 'document',
  preview: {
    select: {
      title: 'fullName',
      subtitle: 'position.name',
      media: 'displayPicture',
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
      name: 'initials',
      title: 'Initials',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'email',
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'reference',
      to: { type: 'department' },
      validation: (Rule) => Rule.required(),
    }),
    
    // Access and position
    defineField({
      name: 'role',
      title: 'Role',
      type: 'reference',
      to: { type: 'role' },
      initialValue: {
        _ref: 'teacher',
      },
      readOnly: true,
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
