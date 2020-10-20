/* eslint-disable linebreak-style */
const tableNames = require('./tableNames');
// Drop in order of dependence (manufacturer is depended on address)
module.exports = [
  tableNames.item_type,
  tableNames.manufacturer,
  tableNames.address,
  tableNames.state,
  tableNames.country,
  tableNames.shape,
  tableNames.location,
  tableNames.user,
];
