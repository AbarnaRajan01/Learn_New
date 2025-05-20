import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'problem',
  title: 'Problem',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty',
      type: 'string',
      options: {
        list: [
          { title: 'Easy', value: 'easy' },
          { title: 'Medium', value: 'medium' },
          { title: 'Hard', value: 'hard' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'starterCode',
      title: 'Starter Code',
      type: 'text',
      description: 'Initial code provided to the user (optional)',
    }),
    defineField({
      name: 'testCases',
      title: 'Test Cases',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
})
