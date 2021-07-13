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
exports.getOrganizationById = exports.createOrganization = exports.getOrganizationByUserId = void 0;
// import pool from "../db";
var __1 = require("..");
var createOrganization = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var nameInput, emailInput, logoInput, organizations, _a, organization_id, email, name_1, created_at, logo, response, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                nameInput = data.name, emailInput = data.email, logoInput = data.logo;
                if (!nameInput || !emailInput) {
                    throw new Error("Name and email are required");
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, __1.db.query(__1.sql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    SELECT * from insert_organization(", "::varchar, \n                                      ", "::varchar, \n                                      ", "::bytea)\n    "], ["\n    SELECT * from insert_organization(", "::varchar, \n                                      ", "::varchar, \n                                      ", "::bytea)\n    "])), nameInput, emailInput, logoInput))];
            case 2:
                organizations = _b.sent();
                if (!organizations[0])
                    return [2 /*return*/, null];
                _a = organizations[0], organization_id = _a.organization_id, email = _a.email, name_1 = _a.name, created_at = _a.created_at, logo = _a.logo;
                response = {
                    organizationId: organization_id,
                    email: email,
                    name: name_1,
                    createdAt: created_at,
                    logo: logo,
                };
                return [2 /*return*/, response];
            case 3:
                error_1 = _b.sent();
                console.log(error_1);
                return [2 /*return*/, null];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createOrganization = createOrganization;
var getOrganizationById = function (organizationId) { return __awaiter(void 0, void 0, void 0, function () {
    var organizations, _a, organization_id, email, name_2, created_at, logo, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!organizationId) {
                    throw new Error("Organization id is required");
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, __1.db.query(__1.sql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["SELECT * FROM get_organization_by_id(", "::int)"], ["SELECT * FROM get_organization_by_id(", "::int)"])), organizationId))];
            case 2:
                organizations = _b.sent();
                if (!organizations[0])
                    return [2 /*return*/, null];
                _a = organizations[0], organization_id = _a.organization_id, email = _a.email, name_2 = _a.name, created_at = _a.created_at, logo = _a.logo;
                return [2 /*return*/, {
                        organizationId: organization_id,
                        email: email,
                        name: name_2,
                        createdAt: created_at,
                        logo: logo,
                    }];
            case 3:
                error_2 = _b.sent();
                console.log(error_2);
                return [2 /*return*/, null];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getOrganizationById = getOrganizationById;
var getOrganizationByUserId = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var organizations, _a, organization_id, name_3, email, created_at, logo, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!userId)
                    return [2 /*return*/, null];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, __1.db.query(__1.sql(templateObject_3 || (templateObject_3 = __makeTemplateObject(["SELECT *\n    FROM get_organization_by_user_id(\n            ", "::integer\n        );"], ["SELECT *\n    FROM get_organization_by_user_id(\n            ", "::integer\n        );"])), Number(userId)))];
            case 2:
                organizations = _b.sent();
                if (!organizations[0])
                    return [2 /*return*/, null];
                _a = organizations[0], organization_id = _a.organization_id, name_3 = _a.name, email = _a.email, created_at = _a.created_at, logo = _a.logo;
                return [2 /*return*/, {
                        organizationId: organization_id,
                        name: name_3,
                        email: email,
                        createdAt: created_at,
                        logo: logo,
                    }];
            case 3:
                error_3 = _b.sent();
                console.log(error_3);
                return [2 /*return*/, null];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getOrganizationByUserId = getOrganizationByUserId;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=organizationController.js.map