const cardsByGroups = [
  {
    title: "Backlog",
    items: [
      {
        id: "TH-456",
        title: "Add user authentification",
        storyName: "Story 1",
        group: "Backlog",
      },
      {
        id: "TH-457",
        title: "Add user authentification1",
        storyName: "Story 1",
        group: "Backlog",
      },
      {
        id: "TH-458",
        title: "Add user authentification2",
        storyName: "Story 2",
        group: "Backlog",
      },
    ],
  },
  {
    title: "In progress",
    items: [],
  },
  { title: "Code review", items: [] },
  { title: "Testing", items: [] },
  { title: "Deployment", items: [] },
  { title: "Blocked", items: [] },
  { title: "Done", items: [] },
];
const columnNames = [
  "Backlog",
  "In progress",
  "Code review",
  "Testing",
  "Deployment",
  "Blocked",
  "Done",
];

const multiselectOptions = [
  { value: "backlog", label: "Backlog" },
  { value: "progress", label: "In progress" },
  { value: "review", label: "Code review" },
  { value: "testing", label: "Testing" },
  { value: "deployment", label: "Deployment" },
  { value: "blocked", label: "Blocked" },
  { value: "done", label: "Done" },
];
export { cardsByGroups, columnNames, multiselectOptions };
