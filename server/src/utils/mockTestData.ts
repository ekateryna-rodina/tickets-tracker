import { Priority } from "./priorityEnum";
import { Roles } from "./roleEnum";
import { TicketStatus } from "./ticketStatusEnum";
import { TicketType } from "./ticketTypeEnum";

export const users = [
  {
    role: Roles.Superuser,
    email: "user1@e.e",
    password: "notsecurepass1",
  },
  {
    role: Roles.Superuser,
    email: "user2@e.e",
    password: "notsecurepass2",
  },
  {
    role: Roles.User,
    email: "user3@e.e",
    password: "notsecurepass3",
  },
];

export const projects: { name: string }[] = [
  { name: "project1" },
  { name: "project2" },
  { name: "project3" },
];

export const organizations = [
  {
    name: "org",
    email: "any",
    logo: Buffer.from([]),
  },
  {
    name: "org1",
    email: "any1",
    logo: Buffer.from([]),
  },
];

export const backlogs: {
  name: string;
  description: string;
}[] = [
  { name: "name1", description: "description1" },
  { name: "name2", description: "description2" },
  { name: "name3", description: "description3" },
];

export const tickets: {
  name: string;
  type: TicketType;
  status: TicketStatus;
  priority: Priority;
  environment: string;
  branch: string;
  description: string;
}[] = [
  {
    name: "defect1",
    type: TicketType.Defect,
    status: TicketStatus.InProgress,
    priority: Priority.Critical,
    environment: "environment1",
    branch: "development 1.1.1",
    description: "description1",
  },
  {
    name: "defect2",
    type: TicketType.Defect,
    status: TicketStatus.RequiresDiscussion,
    priority: Priority.High,
    environment: "environment1",
    branch: "development 1.1.1",
    description: "description2",
  },
  {
    name: "feature1",
    type: TicketType.Task,
    status: TicketStatus.InProgress,
    priority: Priority.High,
    environment: "environment1",
    branch: "development 1.1.1",
    description: "description3",
  },
  {
    name: "feature2",
    type: TicketType.Task,
    status: TicketStatus.Done,
    priority: Priority.Critical,
    environment: "environment1",
    branch: "development 1.1.1",
    description: "description4",
  },
];
