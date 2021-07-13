"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.organizations = exports.projects = exports.users = void 0;
var roleEnum_1 = require("./roleEnum");
exports.users = [
    {
        role: roleEnum_1.Roles.Superuser,
        email: "user1@e.e",
        password: "notsecurepass1",
    },
    {
        role: roleEnum_1.Roles.Superuser,
        email: "user2@e.e",
        password: "notsecurepass2",
    },
    {
        role: roleEnum_1.Roles.User,
        email: "user3@e.e",
        password: "notsecurepass3",
    },
];
exports.projects = [
    { name: "project1" },
    { name: "project2" },
    { name: "project3" },
];
exports.organizations = [
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
//# sourceMappingURL=mockTestData.js.map