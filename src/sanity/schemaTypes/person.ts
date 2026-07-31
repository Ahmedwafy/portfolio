import { defineField, defineType } from 'sanity'

export const person = defineType({
  name: 'person',
  title: 'Person (Site Owner)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headline',
      title: 'Headline / Tagline',
      description: 'Short line shown in the hero, e.g. "Frontend Engineer building delightful web experiences"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar / Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'resumeUrl',
      title: 'Resume/CV URL',
      type: 'url',
    }),
    defineField({
      name: 'skills',
      title: 'Skills & Technologies',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'socialLink',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  'GitHub',
                  'LinkedIn',
                  'Twitter / X',
                  'Instagram',
                  'Email',
                  'Other',
                ],
              },
            }),
            defineField({ name: 'url', title: 'URL', type: 'url' }),
          ],
          preview: {
            select: { title: 'platform', subtitle: 'url' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'headline', media: 'avatar' },
  },
})
