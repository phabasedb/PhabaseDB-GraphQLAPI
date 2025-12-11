import mongoose from "mongoose";

const geneInfoSchema = new mongoose.Schema({
  _id: String,
  accessionId: String,
  name: String,
  start: Number,
  end: Number,
  strand: String,
  sequence: { type: String, match: /^[ATCGatcgnN]*$/ },
  length: Number,
  description: String,
});

const orgaInfoSchema = new mongoose.Schema({
  _id: String,
  name: String,
  description: String,
});

const chromosomeSchema = new mongoose.Schema({
  _id: String,
  name: String,
  type: String,
  description: String,
});

const utrSchema = new mongoose.Schema({
  accessionId: String,
  name: String,
  start: Number,
  end: Number,
  strand: String,
  type: String,
  sequence: { type: String, match: /^[ATCGatcgnN]*$/ },
  length: Number,
});

const exonSchema = new mongoose.Schema({
  accessionId: String,
  name: String,
  start: Number,
  end: Number,
  strand: String,
  type: String,
  sequence: { type: String, match: /^[ATCGatcgnN]*$/ },
  length: Number,
});

const cdSchema = new mongoose.Schema({
  accessionId: String,
  name: String,
  start: Number,
  end: Number,
  strand: String,
  type: String,
  phase: Number,
  sequence: { type: String, match: /^[ATCGatcgnN]*$/ },
  length: Number,
});

const productSchema = new mongoose.Schema({
  _id: String,
  name: String,
  cdsIds: [String],
  sequence: { type: String, match: /^[ATCGatcgnN]*$/ },
  length: Number,
  aminoacidSequence: String,
  aminoacidLength: Number,
});

const transcriptSchema = new mongoose.Schema({
  _id: String,
  accessionId: String,
  start: Number,
  end: Number,
  strand: String,
  sequence: { type: String, match: /^[ATCGatcgnN]*$/ },
  length: Number,
  utrs: [utrSchema],
  exons: [exonSchema],
  cds: [cdSchema],
  product: productSchema,
});

const geneSchema = new mongoose.Schema({
  _id: String,
  gene: geneInfoSchema,
  organism: orgaInfoSchema,
  chromosome: chromosomeSchema,
  transcripts: [transcriptSchema],
});

const Gene = mongoose.model("genesDatamart", geneSchema, "genesDatamart");

export { Gene };
