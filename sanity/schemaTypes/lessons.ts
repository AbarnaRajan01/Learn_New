import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'lesson',
  title: 'Lesson',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'Link to the video content (e.g., YouTube, Vimeo)',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lesson order in the course',
    }),
  ],
})
