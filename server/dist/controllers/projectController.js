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
exports.assignProjectToUser = exports.getProjectsByUserId = exports.getProjectsByOrganizationId = exports.getProjectById = exports.createProject = void 0;
var __1 = require("..");
var organizationController_1 = require("./organizationController");
var _getProjectsFromQueryResponse = function (queryResponse) {
    var projects = [];
    if ((queryResponse === null || queryResponse === void 0 ? void 0 : queryResponse.length) > 0) {
        projects = queryResponse.map(function (p) { return ({
            projectId: p.project_id,
            name: p.name,
            organizationId: p.organization_id,
            createdAt: p.created_at,
        }); });
    }
    return projects;
};
var createProject = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var name, organizationId, organization, queryResponse;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                name = data.name, organizationId = data.organizationId;
                if (!name || !organizationId) {
                    throw new Error("Name and organization id are required");
                }
                return [4 /*yield*/, organizationController_1.getOrganizationById(organizationId)];
            case 1:
                organization = _a.sent();
                if (!organization) {
                    throw new Error("Invalid request");
                }
                return [4 /*yield*/, __1.db.query(__1.sql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["SELECT *\n                    FROM insert_project(\n                            ", "::varchar,\n                            ", "::integer\n                        );"], ["SELECT *\n                    FROM insert_project(\n                            ", "::varchar,\n                            ", "::integer\n                        );"])), name, organizationId))];
            case 2:
                queryResponse = _a.sent();
                return [2 /*return*/, _getProjectsFromQueryResponse(queryResponse)[0] || null];
        }
    });
}); };
exports.createProject = createProject;
var getProjectById = function (projectId) { return __awaiter(void 0, void 0, void 0, function () {
    var queryResponse, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!projectId)
                    return [2 /*return*/, null];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, __1.db.query(__1.sql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["SELECT *\n                    FROM get_project_by_id(\n                            ", "::integer\n                        );"], ["SELECT *\n                    FROM get_project_by_id(\n                            ", "::integer\n                        );"])), Number(projectId)))];
            case 2:
                queryResponse = _a.sent();
                return [2 /*return*/, _getProjectsFromQueryResponse(queryResponse)[0] || null];
            case 3:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getProjectById = getProjectById;
var getProjectsByOrganizationId = function (organizationId) { return __awaiter(void 0, void 0, void 0, function () {
    var queryResponse, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, __1.db.query(__1.sql(templateObject_3 || (templateObject_3 = __makeTemplateObject(["SELECT *\n              FROM get_projects_by_organization_id(\n                      ", "::integer\n                  );"], ["SELECT *\n              FROM get_projects_by_organization_id(\n                      ", "::integer\n                  );"])), organizationId))];
            case 1:
                queryResponse = _a.sent();
                return [2 /*return*/, _getProjectsFromQueryResponse(queryResponse)];
            case 2:
                error_2 = _a.sent();
                console.log(error_2);
                return [2 /*return*/, null];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getProjectsByOrganizationId = getProjectsByOrganizationId;
// likely to be user to assign qa and pm to a project
var assignProjectToUser = function (userId, projectId) { return __awaiter(void 0, void 0, void 0, function () {
    var error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!projectId || !userId) {
                    throw new Error("UserId and projectId are required");
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, __1.db.query(__1.sql(templateObject_4 || (templateObject_4 = __makeTemplateObject(["INSERT INTO project_user(user_id, project_id) VALUES(", "::integer, ", "::integer)"], ["INSERT INTO project_user(user_id, project_id) VALUES(", "::integer, ", "::integer)"])), userId, projectId))];
            case 2:
                _a.sent();
                return [2 /*return*/, { userId: userId, projectId: projectId }];
            case 3:
                error_3 = _a.sent();
                console.log(error_3);
                return [2 /*return*/, null];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.assignProjectToUser = assignProjectToUser;
var getProjectsByUserId = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var queryResponse, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, __1.db.query(__1.sql(templateObject_5 || (templateObject_5 = __makeTemplateObject(["SELECT *\n                  FROM get_projects_by_user_id(\n                          ", "::integer\n                      );"], ["SELECT *\n                  FROM get_projects_by_user_id(\n                          ", "::integer\n                      );"])), userId))];
            case 1:
                queryResponse = _a.sent();
                return [2 /*return*/, _getProjectsFromQueryResponse(queryResponse)];
            case 2:
                error_4 = _a.sent();
                console.log(error_4);
                return [2 /*return*/, null];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getProjectsByUserId = getProjectsByUserId;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
//# sourceMappingURL=projectController.js.map