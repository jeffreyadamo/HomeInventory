// eslint-disable-next-line no-unused-vars
const Knex = require('knex');

const {
  addDefaultColumns,
  // eslint-disable-next-line no-unused-vars
  createNameTable,
  references,
  url,
  // eslint-disable-next-line no-unused-vars
  email,
} = require('../../src/lib/tableUtils');
const tableNames = require('../../src/constants/tableNames');

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.table(tableNames.state, (table) => {
    table.string('code');
  });

  await knex.schema.table(tableNames.country, (table) => {
    table.string('code');
  });

  await knex.schema.createTable(tableNames.size, (table) => {
    table.increments();
    table.string('name').notNullable();
    table.float('length');
    table.float('width');
    table.float('height');
    table.float('volume');
    references(table, tableNames.shape);
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.item, (table) => {
    table.increments();
    references(table, tableNames.user);
    table.string('name', 255);
    references(table, tableNames.item_type);
    table.text('description');
    references(table, tableNames.company);
    references(table, tableNames.size);
    table.boolean('sparks_joy').defaultTo(true);
    table.string('sku', 42);
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.item_info, (table) => {
    table.increments();
    references(table, tableNames.user);
    references(table, tableNames.item);
    table.dateTime('purchase_date').notNullable();
    table.dateTime('expiration_date');
    references(table, tableNames.company, 'retailer'); // changes column name to 'retailer'
    table.dateTime('last_used');
    table.float('purchase_price').notNullable().defaultTo(0);
    table.float('msrp').notNullable().defaultTo(0);
    references(table, tableNames.inventory_location);
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.item_image, (table) => {
    table.increments();
    references(table, tableNames.item);
    url(table, 'image_url');
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.related_item, (table) => {
    table.increments();
    references(table, tableNames.item);
    references(table, tableNames.item, false, 'related_item');
    addDefaultColumns(table);
  });
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  // await knex.schema.table(tableNames.address, (table) => {
  //   references(table, tableNames.country);
  // });

  // await knex.schema.table(tableNames.state, (table) => {
  //   table.dropColumn('country_id');
  // });
  await Promise.all(
    [
      tableNames.related_item,
      tableNames.item_image,
      tableNames.item_info,
      tableNames.item,
      tableNames.size,
    ].map((tableName) => knex.schema.dropTableIfExists(tableName)),
  );

  // await knex.schema.dropTable(tableNames.size);
};
