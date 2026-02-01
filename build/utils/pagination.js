"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvePagination = resolvePagination;
var _graphql = require("graphql");
var _constants = require("../config/constants");
var DEFAULT_LIMIT = _constants.PAGINATION.DEFAULT_LIMIT,
  MAX_LIMIT = _constants.PAGINATION.MAX_LIMIT;
function resolvePagination(limit) {
  var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  if (limit < 0 || limit > MAX_LIMIT) {
    throw new _graphql.GraphQLError("limit must be between 1 and ".concat(MAX_LIMIT), {
      extensions: {
        statusCode: 400
      }
    });
  }
  var safeLimit = limit === 0 ? DEFAULT_LIMIT : limit;
  var safePage = Math.max(page, 0);
  return {
    limit: safeLimit,
    page: safePage,
    offset: safePage * safeLimit
  };
}