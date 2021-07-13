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
exports.createProjects = exports.clearUsers = exports.clearOrganizations = exports.createOrganizations = exports.createUsers = exports.clearProjects = void 0;
var __1 = require("..");
var createUsers = function (mockUsers) { return __awaiter(void 0, void 0, void 0, function () {
    var users, _i, mockUsers_1, user, role, newUserResponse, _a, user_id, email, user_role;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                users = [];
                _i = 0, mockUsers_1 = mockUsers;
                _b.label = 1;
            case 1:
                if (!(_i < mockUsers_1.length)) return [3 /*break*/, 4];
                user = mockUsers_1[_i];
                role = user.role.toString();
                return [4 /*yield*/, __1.db.query(__1.sql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        SELECT * from insert_user_with_role(", "::varchar, \n                                          ", "::varchar, \n                                          ", "::roles)\n        "], ["\n        SELECT * from insert_user_with_role(", "::varchar, \n                                          ", "::varchar, \n                                          ", "::roles)\n        "])), user.email, user.password, role))];
            case 2:
                newUserResponse = _b.sent();
                _a = newUserResponse[0], user_id = _a.user_id, email = _a.email, user_role = _a.user_role;
                users.push({ userId: user_id, email: email, role: user_role });
                _b.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/, users];
        }
    });
}); };
exports.createUsers = createUsers;
var createOrganizations = function (mockOrganizations) { return __awaiter(void 0, void 0, void 0, function () {
    var organizations, _i, mockOrganizations_1, organization, newOrganizationResponse, _a, organization_id, email, name_1, created_at, logo;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                organizations = [];
                _i = 0, mockOrganizations_1 = mockOrganizations;
                _b.label = 1;
            case 1:
                if (!(_i < mockOrganizations_1.length)) return [3 /*break*/, 4];
                organization = mockOrganizations_1[_i];
                return [4 /*yield*/, __1.db.query(__1.sql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n        SELECT * from insert_organization(", "::varchar, \n                                          ", "::varchar, \n                                          ", "::bytea)\n        "], ["\n        SELECT * from insert_organization(", "::varchar, \n                                          ", "::varchar, \n                                          ", "::bytea)\n        "])), organization.name, organization.email, organization.logo))];
            case 2:
                newOrganizationResponse = _b.sent();
                _a = newOrganizationResponse[0], organization_id = _a.organization_id, email = _a.email, name_1 = _a.name, created_at = _a.created_at, logo = _a.logo;
                organizations.push({
                    organizationId: organization_id,
                    email: email,
                    name: name_1,
                    createdAt: created_at,
                    logo: logo,
                });
                _b.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/, organizations];
        }
    });
}); };
exports.createOrganizations = createOrganizations;
var createProjects = function (mockProjects) { return __awaiter(void 0, void 0, void 0, function () {
    var projectIds, _i, mockProjects_1, project, queryResponse;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                projectIds = [];
                console.log("here");
                _i = 0, mockProjects_1 = mockProjects;
                _a.label = 1;
            case 1:
                if (!(_i < mockProjects_1.length)) return [3 /*break*/, 4];
                project = mockProjects_1[_i];
                return [4 /*yield*/, __1.db.query(__1.sql(templateObject_3 || (templateObject_3 = __makeTemplateObject(["SELECT *\n    FROM insert_project(\n            ", "::varchar,\n            ", "::integer\n        );"], ["SELECT *\n    FROM insert_project(\n            ", "::varchar,\n            ", "::integer\n        );"])), project.name, project.organizationId))];
            case 2:
                queryResponse = _a.sent();
                projectIds.push(queryResponse[0].project_id);
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4:
                console.log("here");
                console.log(projectIds);
                return [2 /*return*/, projectIds];
        }
    });
}); };
exports.createProjects = createProjects;
function clearOrganizations() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, __1.db.query(__1.sql(templateObject_4 || (templateObject_4 = __makeTemplateObject(["DELETE FROM organization;"], ["DELETE FROM organization;"]))))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.clearOrganizations = clearOrganizations;
function clearUsers() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, __1.db.query(__1.sql(templateObject_5 || (templateObject_5 = __makeTemplateObject(["DELETE FROM users;"], ["DELETE FROM users;"]))))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.clearUsers = clearUsers;
function clearProjects() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, __1.db.query(__1.sql(templateObject_6 || (templateObject_6 = __makeTemplateObject(["DELETE FROM project;"], ["DELETE FROM project;"]))))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.clearProjects = clearProjects;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
//# sourceMappingURL=inMemoryDbHelpers.js.map