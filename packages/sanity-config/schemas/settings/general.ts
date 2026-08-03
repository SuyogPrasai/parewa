import { Settings2 } from 'lucide-react'

import { ALL_FIELDS_GROUP, defineField, defineType } from 'sanity'

export default defineType({
  name: 'general',
  title: 'General Settings',
  icon: Settings2,
  type: 'document',
  groups: [
    { name: 'general', title: 'General' },
    { name: 'content', title: 'Content' },
    { name: 'footer', title: 'Footer' },
    { name: 'sliders', title: 'Sliders' },
    { ...ALL_FIELDS_GROUP, hidden: true }
  ],
  preview: {
    select: { title: 'title' }
  },
  fields: [
    // Metadata
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      readOnly: true,
    }),

    // General
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Description',
      type: 'text',
      group: 'general',
    }),
    defineField({
      name: 'supportEmail',
      title: 'Support Email',
      type: 'email',
      group: 'general',
    }),
    defineField({
      name: 'logoText',
      title: 'Logo Text',
      type: 'string',
      group: 'general',
    }),

    // Content
    defineField({
      name: 'categories',
      title: 'Active Categories',
      type: 'array',
      group: 'content',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    }),
    defineField({
      name: 'sliders',
      title: 'Sliders',
      type: 'array',
      group: 'sliders',
      of: [{
        type: 'reference',
        to: [{ type: 'slider' }]
      }],
    }),
    defineField({
      name: 'socials',
      title: 'Active Socials',
      type: 'array',
      group: 'content',
      of: [{ type: 'reference', to: [{ type: 'socials' }] }],
    }),
    defineField({
      name: 'supportUsText',
      title: 'Support Us Text',
      type: 'text',
      group: 'general',
    }),
    defineField({
      name: 'about',
      title: 'About Page',
      type: 'reference',
      group: 'content',
      to: [{ type: 'link' }]
    }),
    defineField({
      name: 'sebsdb',
      title: 'SEBS DB',
      type: 'reference',
      group: 'content',
      to: [{ type: 'link' }]
    }),
    defineField({
      name: 'supportUs',
      title: 'Support Us',
      type: 'reference',
      group: 'content',
      to: [{ type: 'link' }]
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      group: 'content',
      of: [{ type: 'reference', to: [{ type: 'link' }] }]
    }),
    defineField({
      name: 'terms',
      title: 'Terms of Conditions',
      type: 'url',
      group: 'content',
    }),
    defineField({
      name: 'privacy',
      title: 'Privacy Policy',
      type: 'url',
      group: 'content',
    }),
    defineField({
      name: 'donorPrivacy',
      title: 'Donor Privacy Policy',
      type: 'url',
      group: 'content',
    }),
    
    // Footer
    defineField({
      name: 'footerText',
      title: 'Footer Text',
      type: 'string',
      group: 'footer'
    }),
    defineField({
      name: 'footerSocials',
      title: 'Active Socials',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'socials' }] }],
      group: 'footer'
    }),
    defineField({
      name: 'footerCategories',
      title: 'Active Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
      group: 'footer'
    }),
  ],
})
