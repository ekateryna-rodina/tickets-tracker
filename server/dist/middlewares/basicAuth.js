"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRole = exports.authUser = void 0;
var authUser = function (req, res, next) {
    if (!req.currentUser) {
        res.status(403);
        return res.send("Please log in into system");
    }
    next();
};
exports.authUser = authUser;
var authRole = function (role) {
    return function (req, res, next) {
        var _a;
        if (((_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.role) !== role) {
            res.status(401);
            return res.send("Not allowed");
        }
        next();
    };
};
exports.authRole = authRole;
//# sourceMappingURL=basicAuth.js.map