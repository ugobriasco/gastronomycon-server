const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  category: String, // e.g. aromi
  type: String, // enum basic | spec
  package: Array,
  primaryName: String, // equal to en_GB name
  pic: String,
  fr_FR: {
    name: String, //name in the given locale
    gen: String // genre, enum m,f,n,pl-m, pl-f, pl-n
  },
  en_GB: {
    name: String,
    gen: String
  },
  it_IT: {
    name: String,
    gen: String
  },
  es_ES: {
    name: String,
    gen: String
  },
  de_DE: {
    name: String,
    gen: String
  }
});

module.exports = mongoose.model('Grocery', Schema);
