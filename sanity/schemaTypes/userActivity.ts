// schemas/userActivity.js
export default {
  name: 'userActivity',
  title: 'User Activity',
  type: 'document',
  fields: [
    {
      name: 'userId',
      title: 'User ID',
      type: 'string',
    },
    {
      name: 'courseId',
      title: 'Course ID',
      type: 'string',
    },
    {
      name: 'status',
      title: 'Completion Status',
      type: 'string',
      options: {
        list: ['Not Started', 'In Progress', 'Completed'],
      },
    },
  ],
}
