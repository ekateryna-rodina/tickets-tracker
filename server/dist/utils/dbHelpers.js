"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composeUpdateQuery = void 0;
function composeUpdateQuery(tableName, map, entityId) {
    var keys = Object.keys(map);
    var query = ["UPDATE " + tableName + " SET "];
    keys.forEach(function (k) {
        query.push(k + "=" + map[k]);
    });
    query = [query.join(", ")];
    query.push("WHERE " + tableName + "_id = " + entityId);
    return query.join(" ");
}
exports.composeUpdateQuery = composeUpdateQuery;
//# sourceMappingURL=dbHelpers.js.map