"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var setUser_1 = require("./middlewares/setUser");
var createUser_1 = require("./routes/createUser");
var app = express_1.default();
exports.app = app;
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(setUser_1.setUser);
// users
app.use(createUser_1.createUserRoute);
//# sourceMappingURL=app.js.map