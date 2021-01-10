/* eslint-disable linebreak-style */
const tableNames = require('./tableNames');
// Drop in order of dependence (manufacturer is depended on address)
module.exports = [
  tableNames.item_type,
  tableNames.company,
  tableNames.address,
  tableNames.state,
  tableNames.country,
  tableNames.shape,
  tableNames.inventory_location,
  tableNames.user,
];
