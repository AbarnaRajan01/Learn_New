export default {
  name: 'roadmap',
  type: 'document',
  title: 'Roadmap',
  fields: [
    { name: 'slug', type: 'slug', title: 'Slug' },
    { name: 'title', type: 'string', title: 'Title' },
    { name: 'description', type: 'text', title: 'Description' },
    {
      name: 'image',
      title: 'Course Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'pdf',
      title: 'Roadmap PDF',
      type: 'file',
      options: {
        accept: 'application/pdf',
      },
    },
  ],
}
