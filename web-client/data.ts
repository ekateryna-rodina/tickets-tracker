import { TicketStatus } from "./utils/ticketStatusEnum";
const cards: {
  id: string;
  title: string;
  storyName: string;
  status: TicketStatus;
}[] = [
  {
    id: "TH-456",
    title: "Add user authentification",
    storyName: "Story 1",
    status: TicketStatus.InProgress,
  },
  {
    id: "TH-457",
    title: "Add user authentification1",
    storyName: "Story 1",
    status: TicketStatus.InProgress,
  },
  {
    id: "TH-458",
    title: "Add user authentification2",
    storyName: "Story 2",
    status: TicketStatus.Backlog,
  },
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
export { cards, multiselectOptions };
