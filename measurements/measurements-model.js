const db = require('../data/dbConfig');

function getMeasurments() {
  return db('measurements').select("name")
}

module.exports = {
  getMeasurments,
}