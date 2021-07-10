import { Roles } from "./roleEnum";

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
