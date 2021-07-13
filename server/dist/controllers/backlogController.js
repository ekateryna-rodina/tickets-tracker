"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBacklogById = exports.updateBacklog = exports.deleteBacklog = exports.createBacklog = void 0;
var __1 = require("..");
var dbHelpers_1 = require("../utils/dbHelpers");
var createBacklog = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var projectId, creatorId, nameInput, sprintId, estimatedAt, endedAt, descriptionInput, backlogResponse, _a, backlog_id, project_id, creator_id, name_1, sprint_id, estimated_at, ended_at, description, created_at, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                projectId = data.projectId, creatorId = data.creatorId, nameInput = data.name, sprintId = data.sprintId, estimatedAt = data.estimatedAt, endedAt = data.endedAt, descriptionInput = data.description;
                if (!projectId || !creatorId || !nameInput || !descriptionInput) {
                    throw new Error("ProjectId, creatorId, name and description are required");
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, __1.db.query(__1.sql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["SELECT * FROM insert_backlog(", "::integer,\n        ", "::integer, ", "::varchar, ", "::integer, ", "::timestamp,\n        ", "::timestamp, ", "::varchar)"], ["SELECT * FROM insert_backlog(", "::integer,\n        ", "::integer, ", "::varchar, ", "::integer, ", "::timestamp,\n        ", "::timestamp, ", "::varchar)"])), projectId, creatorId, nameInput, sprintId, estimatedAt, endedAt, descriptionInput))];
            case 2:
                backlogResponse = _b.sent();
                _a = backlogResponse[0], backlog_id = _a.backlog_id, project_id = _a.project_id, creator_id = _a.creator_id, name_1 = _a.name, sprint_id = _a.sprint_id, estimated_at = _a.estimated_at, ended_at = _a.ended_at, description = _a.description, created_at = _a.created_at;
                return [2 /*return*/, {
                        backlogId: backlog_id,
                        projectId: project_id,
                        creatorId: creator_id,
                        name: name_1,
                        sprintId: sprint_id,
                        estimatedAt: estimated_at,
                        createdAt: created_at,
                        endedAt: ended_at,
                        description: description,
                    }];
            case 3:
                error_1 = _b.sent();
                console.log(error_1);
                return [2 /*return*/, null];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createBacklog = createBacklog;
var deleteBacklog = function (backlogId) { return __awaiter(void 0, void 0, void 0, function () {
    var backlogResponse, backlog_id, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!backlogId) {
                    throw new Error("BacklogId is required");
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, __1.db.query(__1.sql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["SELECT * FROM delete_backlog(", "::integer)"], ["SELECT * FROM delete_backlog(", "::integer)"])), backlogId))];
            case 2:
                backlogResponse = _a.sent();
                backlog_id = backlogResponse[0].backlog_id;
                return [2 /*return*/, backlog_id];
            case 3:
                error_2 = _a.sent();
                console.log(error_2);
                return [2 /*return*/, null];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteBacklog = deleteBacklog;
var updateBacklog = function (backlogId, data) { return __awaiter(void 0, void 0, void 0, function () {
    var query, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if ("projectId" in data || "creatorId" in data) {
                    throw new Error("Cannot update project and creator data");
                }
                query = dbHelpers_1.composeUpdateQuery("backlog", data, backlogId);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, __1.db.query(__1.sql(templateObject_3 || (templateObject_3 = __makeTemplateObject(["", ""], ["", ""])), query))];
            case 2:
                _a.sent();
                // has to return record data
                return [2 /*return*/, data];
            case 3:
                error_3 = _a.sent();
                console.log(error_3);
                return [2 /*return*/, null];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateBacklog = updateBacklog;
var getBacklogById = function (backlogId) { return __awaiter(void 0, void 0, void 0, function () {
    var backlogResponse, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!backlogId) {
                    throw new Error("BacklogId must be provided");
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, __1.db.query(__1.sql(templateObject_4 || (templateObject_4 = __makeTemplateObject(["SELECT * FROM get_backlog_by_id(", "::integer)"], ["SELECT * FROM get_backlog_by_id(", "::integer)"])), backlogId))];
            case 2:
                backlogResponse = _a.sent();
                return [2 /*return*/, backlogResponse[0]];
            case 3:
                error_4 = _a.sent();
                console.log(error_4);
                return [2 /*return*/, null];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getBacklogById = getBacklogById;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=backlogController.js.map