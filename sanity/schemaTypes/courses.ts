export default {
  name: 'course',
  title: 'Course',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Course Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Course Description',
      type: 'text',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
    },
    {
      name: 'level',
      title: 'Course Level',
      type: 'string',
      options: {
        list: ['Beginner', 'Intermediate', 'Advanced'],
      },
    },
    {
      name: 'url',
      title: 'Course URL',
      type: 'url',
    },
    {
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'English', value: 'English' },
          { title: 'Tamil', value: 'Tamil' },
          { title: 'Hindi', value: 'Hindi' },
        ],
      },
    },
    {
      name: 'image',
      title: 'Course Image',
      type: 'image',  // Added image field
      options: {
        hotspot: true,  // Enables focus point for the image (optional)
      },
    },
  ],
};
