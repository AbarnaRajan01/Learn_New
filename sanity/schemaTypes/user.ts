export default {
    name: "user",
    title: "User",
    type: "document",
    fields: [
      {
        name: "name",
        type: "string",
        title: "Name",
      },
      {
        name: "email",
        type: "string",
        title: "Email",
      },
      {
        name: "interests",
        type: "array",
        title: "Interests",
        of: [{ type: "string" }],
      },
      {
        name: "preferences",
        type: "text",
        title: "Preferences",
      },
      {
        name: "role",
        type:"text",
        title:"Role"
      }
    ],
  };
  