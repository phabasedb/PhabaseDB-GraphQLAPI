"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.geneResolvers = void 0;
var _gene_model = require("./gene_model");
var _gene_controller = require("./gene_controller");
var _controller_common_functions = require("../common/controller_common_functions");
var _constants = require("../../config/constants");
var DEFAULT_LIMIT = _constants.PAGINATION.DEFAULT_LIMIT;
var geneResolvers = exports.geneResolvers = {
  Query: {
    getAllGenes: function getAllGenes(root, _ref) {
      var _ref$limit = _ref.limit,
        limit = _ref$limit === void 0 ? DEFAULT_LIMIT : _ref$limit,
        page = _ref.page;
      return _controller_common_functions.commonController.getAll(_gene_model.Gene, limit, page, "gene.accessionId");
    },
    getGeneBy: function getGeneBy(root, _ref2) {
      var search = _ref2.search,
        advancedSearch = _ref2.advancedSearch,
        _ref2$limit = _ref2.limit,
        limit = _ref2$limit === void 0 ? DEFAULT_LIMIT : _ref2$limit,
        page = _ref2.page,
        properties = _ref2.properties,
        fullMatchOnly = _ref2.fullMatchOnly;
      return _gene_controller.geneController.getGeneBy(search, advancedSearch, limit, page, properties, fullMatchOnly);
    }
  }
};