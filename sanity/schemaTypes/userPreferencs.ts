export default {
  name: 'userPreferences',
  title: 'User Preferences',
  type: 'document',
  fields: [
    {
      name: 'userId',
      title: 'User ID',
      type: 'string',
    },
    {
      name: 'interests',
      title: 'Interests',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'levelPreference',
      title: 'Level Preference',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner', value: 'Beginner' },
          { title: 'Intermediate', value: 'Intermediate' },
          { title: 'Advanced', value: 'Advanced' },
        ],
      },
    },
    {
      name: 'preferredLanguage',
      title: 'Preferred Language',
      type: 'string',
      options: {
        list: [
          { title: 'English', value: 'English' },
          { title: 'Tamil', value: 'Tamil' },
          { title: 'Hindi', value: 'Hindi' },
        ],
      },
    },
  ],
};
