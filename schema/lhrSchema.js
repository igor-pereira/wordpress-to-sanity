const Schema = require('@sanity/schema').default

module.exports = Schema.compile({
  name: 'myBlog',
  types: [
    {
      name: 'post',
      title: 'Post',
      i18n: true,
      type: 'document',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (rule) => rule.required(),
          group: 'content',
        },
        {
          name: 'slug',
          title: 'Slug',
          type: 'slug',
          options: {
            source: 'title',
            maxLength: 96,
            isUnique: (value, context) => context.defaultIsUnique(value, context),
          },
          validation: (rule) => rule.required(),
          group: 'content',
        },
        {
          name: 'content',
          title: 'Content',
          type: 'array',
          group: 'content',
          of: [
            {
              type: 'block',
              marks: {
                annotations: [
                  {
                    name: 'externalLink',
                    type: 'object',
                    title: 'External link',
                    fields: [
                      {
                        name: 'href',
                        type: 'url',
                        title: 'URL',
                      },
                      {
                        title: 'Open in new tab',
                        name: 'blank',
                        type: 'boolean',
                      },
                    ],
                    validation: (Rule) => Rule.required(),
                  },
                  {
                    name: 'internalLink',
                    type: 'object',
                    title: 'Internal link',
                    fields: [
                      {
                        name: 'reference',
                        type: 'reference',
                        title: 'Reference',
                        to: [{type: 'post'}],
                      },
                    ],
                    validation: (Rule) => Rule.required(),
                  },
                ],
                decorators: [
                  {title: 'Strong', value: 'strong'},
                  {title: 'Emphasis', value: 'em'},
                  {title: 'Code', value: 'code'},
                  {title: 'Underline', value: 'underline'},
                  {title: 'Strike', value: 'strike-through'},
                ],
              },
            },
            {type: 'image'},
            {
              title: 'Cta',
              name: 'cta',
              type: 'object',
              fields: [
                {
                  title: 'CTA',
                  name: 'cta',
                  type: 'cta',
                },
              ],
            },
          ],
        },
        {
          name: 'excerpt',
          title: 'Excerpt',
          type: 'text',
          group: 'content',
        },
        {
          name: 'coverImage',
          title: 'Cover Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          group: 'content',
        },
        {
          name: 'category',
          title: 'Category',
          type: 'reference',
          to: [{type: 'postCategory'}],
          group: 'content',
          validation: (rule) => rule.required(),
        },
        {
          name: 'date',
          title: 'Date',
          type: 'datetime',
          initialValue: () => new Date().toISOString(),
          group: 'content',
        },

        {
          title: 'SEO / Share Settings',
          name: 'seo',
          type: 'seo',
          group: 'settings',
          validation: (rule) => rule.required(),
        },
      ],
    },
    {
      title: 'SEO / Share Settings',
      name: 'seo',
      type: 'object',
      options: {
        collapsible: true
      },
      fields: [
        {
          title: 'Meta Title',
          name: 'metaTitle',
          type: 'string',
          description: 'Title used for search engines and browsers',
          validation: Rule =>
            Rule.max(50).warning('Longer titles may be truncated by search engines')
        },
        {
          title: 'Meta Description',
          name: 'metaDesc',
          type: 'text',
          rows: 3,
          description: 'Description for search engines',
          validation: Rule =>
            Rule.max(150).warning(
              'Longer descriptions may be truncated by search engines'
            )
        },
        {
          title: 'Share Title',
          name: 'shareTitle',
          type: 'string',
          description: 'Title used for social sharing cards',
          validation: Rule =>
            Rule.max(50).warning('Longer titles may be truncated by social sites')
        },
        {
          title: 'Share Description',
          name: 'shareDesc',
          type: 'text',
          rows: 3,
          description: 'Description used for social sharing cards',
          validation: Rule =>
            Rule.max(150).warning(
              'Longer descriptions may be truncated by social sites'
            )
        },
        {
          title: 'Share Graphic',
          name: 'shareGraphic',
          type: 'image',
          description: 'Recommended size: 1200x630 (PNG or JPG)'
        }
      ]
    }
    
  ],
})
