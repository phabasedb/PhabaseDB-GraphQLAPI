"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Gene = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var geneInfoSchema = new _mongoose["default"].Schema({
  _id: String,
  accessionId: String,
  name: String,
  start: Number,
  end: Number,
  strand: String,
  sequence: {
    type: String,
    match: /^[ATCGatcgnN]*$/
  },
  length: Number,
  description: String
});
var orgaInfoSchema = new _mongoose["default"].Schema({
  _id: String,
  name: String,
  description: String
});
var chromosomeSchema = new _mongoose["default"].Schema({
  _id: String,
  name: String,
  type: String,
  description: String
});
var utrSchema = new _mongoose["default"].Schema({
  accessionId: String,
  name: String,
  start: Number,
  end: Number,
  strand: String,
  type: String,
  sequence: {
    type: String,
    match: /^[ATCGatcgnN]*$/
  },
  length: Number
});
var exonSchema = new _mongoose["default"].Schema({
  accessionId: String,
  name: String,
  start: Number,
  end: Number,
  strand: String,
  type: String,
  sequence: {
    type: String,
    match: /^[ATCGatcgnN]*$/
  },
  length: Number
});
var cdSchema = new _mongoose["default"].Schema({
  accessionId: String,
  name: String,
  start: Number,
  end: Number,
  strand: String,
  type: String,
  phase: Number,
  sequence: {
    type: String,
    match: /^[ATCGatcgnN]*$/
  },
  length: Number
});
var productSchema = new _mongoose["default"].Schema({
  _id: String,
  name: String,
  cdsIds: [String],
  sequence: {
    type: String,
    match: /^[ATCGatcgnN]*$/
  },
  length: Number,
  aminoacidSequence: String,
  aminoacidLength: String
});
var transcriptSchema = new _mongoose["default"].Schema({
  _id: String,
  accessionId: String,
  start: Number,
  end: Number,
  strand: String,
  sequence: {
    type: String,
    match: /^[ATCGatcgnN]*$/
  },
  length: Number,
  utrs: [utrSchema],
  exons: [exonSchema],
  cds: [cdSchema],
  product: productSchema
});
var geneSchema = new _mongoose["default"].Schema({
  _id: String,
  gene: geneInfoSchema,
  organism: orgaInfoSchema,
  chromosome: chromosomeSchema,
  transcripts: [transcriptSchema]
});
var Gene = exports.Gene = _mongoose["default"].model("genesDatamart", geneSchema, "genesDatamart");