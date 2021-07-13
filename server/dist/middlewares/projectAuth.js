"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectAuth = void 0;
var project_1 = require("../permissions/project");
var projectAuth = function (req, res, next) {
    if (!project_1.canAccessProject(req.currentUser, req.project)) {
        res.status(401);
        return res.send("Project is not accessible");
    }
    next();
};
exports.projectAuth = projectAuth;
//# sourceMappingURL=projectAuth.js.map