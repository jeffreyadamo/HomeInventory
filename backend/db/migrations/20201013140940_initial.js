// exports.up is creating database datbase and migrations between tables
// Use async/await to since it may have to be done in order
const Knex = require('knex');
/**
 * @param {Knex} knex
 */
const tableNames = require('../../src/constants/tableNames');

function addDefaultColumns(table) {
  table.timestamps(false, true);
  table.datetime('deleted_at');
}

function createNameTable(knex, table_name) {
  return knex.schema.createTable(table_name, (table) => {
    table.increments().notNullable(); // creates column "id"
    table.string('name').notNullable().unique();
    addDefaultColumns(table);
  });
}

function references(table, tableName) {
  table
    .integer(`${tableName}_id`)
    .unsigned()
    .references('id')
    .inTable(tableName)
    .onDelete('cascade');
}

function url(table, columnName) {
  table.string(columnName, 2000);
}

function email(table, columnName) {
  return table.string(columnName, 254);
}
/**
 * @param {Knex} knex
 */

exports.up = async (knex) => {
  // DDL Data Definition Language

  await Promise.all([
    // Promise.all will create all of these together since they don't depend on each other
    // None of these tables have foreign key references
    // creating the 'user' table
    knex.schema.createTable(tableNames.user, (table) => {
      table.increments().notNullable(); // creates column "id"
      email(table, 'email').notNullable().unique();
      table.string('name', 254).notNullable();
      table.string('password', 127).notNullable();
      table.datetime('last_login');
      addDefaultColumns(table);
    }),
    // creating the 'item_type' table
    knex.schema.createTable(tableNames.item_type, (table) => {
      table.increments().notNullable(); // creates column "id"
      table.string('name').notNullable().unique();
      addDefaultColumns(table);
    }),

    // Instead of doing the above for 'item_type', we can make a function to handle tables similar
    // creating the 'state', 'country', 'shape' tables
    createNameTable(knex, tableNames.state),
    createNameTable(knex, tableNames.country),
    createNameTable(knex, tableNames.shape),

    // creating the location table
    knex.schema.createTable(tableNames.location, (table) => {
      table.increments().notNullable(); // creates column "id"
      table.string('name').notNullable().unique();
      table.string('description', 1000);
      url(table, 'image_url');
      addDefaultColumns(table);
    }),
  ]);

  // FOREIGN KEYS
  // After Promise.all runs, then we can insert tables with Foreign Keys

  // 'address' table has 'state', and 'country' FKs
  await knex.schema.createTable(tableNames.address, (table) => {
    table.increments().notNullable(); // creates column "id"
    table.string('street_address_1', 50).notNullable();
    table.string('street_address_2', 50);
    table.string('city', 50).notNullable();
    table.string('zipcode', 15).notNullable();
    table.float('latitude').notNullable();
    table.float('longitude').notNullable();
    // FOREIGN KEYS
    // 'unsigned indicates integer can only be positive
    table.integer('state_id').unsigned().references('id').inTable('state');
    // instead of doing this for every foreign key, we can use a helper function
    references(table, 'country');
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.manufacturer, (table) => {
    table.increments().notNullable(); // creates column "id"
    table.string('name').notNullable();
    table.string('description', 1000);
    url(table, 'logo_url');
    url(table, 'website_url');
    email(table, 'email');
    references(table, 'address');
    addDefaultColumns(table);
  });
};
// exports.down specifies dropping of all the tables
exports.down = async (knex) => {
  await Promise.all([
    tableNames.address,
    tableNames.user,
    tableNames.item_type,
    tableNames.state,
    tableNames.country,
    tableNames.shape,
    tableNames.location,
  ].map((tableName) => knex.schema.dropTable(tableName)));

  // if only dropping one table try:
  // await knex.schema.dropTable(tableNames.user);
};
