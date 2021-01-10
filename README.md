# Home Inventory Tracker

A PostgreSQL inventory tracking app built by following tutorial videos from [Coding Garden with CJ](https://github.com/CodingGarden)

Reference repository: https://github.com/CodingGarden/inventory-app  
YouTube Channel: https://www.youtube.com/playlist?list=PLM_i0obccy3uJ876-W_BKBzjd9L2ZGB4B

## Key Features I'm trying to learn:
### Backend
* PostgreSQL - alternative to MySQL for SQL relationship database
* [Knex.js](http://knexjs.org/#Installation-client) - SQL query builder. Compatable with MySQL for future use! May include with Objection.js. Going to forego using Sequelize for this one. This allows for us to design the database first. 
* Docker - container creates an image to ensure user's running environment is standardized (first experience with this; tricky)
* Entity Models - [Home Inventory ET Diagram](https://app.lucidchart.com/invitations/accept/305365a9-5493-4958-8ead-386f98334a4d) using LucidChart
* ESLint setup
### Front End
* Haven't started yet

## Where am I at?
* 1/8 - finished up database design. 2 backend/db/migrations files should be mostly formed. Next epiode is #07 - looks to be working on seeding data into the database. 
* 10/30 - updating the migration files as the database tables are being updated
* 10/19 - Fire up your PostgreSQL, we can seed a database. Docker isn't quite working yet. 
I'm finishing up Video#3 and am beginning to seed the database.  
So far I have 3 starting scripts in package.json:
```
npm run migrate - uses knex to create database, tables from db/migrations
npm run rollback - uses knex to go back one migration
npm run seed - uses knex to seed database with data
```
* I've been enjoying using LucidChart for the entity relationship modeling. We began using knex to migrate tables that don't have dependencies (references), and now have a couple tables that do have references. 
* Beginning to write the seed files. In it there's a usage for creating a user (with password encryption)
## Notes:
Entity - the description of some thing in your database
  Record - is ta single instance of an Entity

Every Record will have:
Create At - datetime
Updated At - datetime
Deleted At - datetime

## Entities in a Home Inventory System
* [x] User
* [x] Item Type
* [x] Manufacturer
* [ ] Comment
* [ ] Warranty
* [x] Item Location
* [ ] Item Purchase Location

## Seed the Database

* [x] User
* [ ] Countries
* [ ] US States
* [ ] Item Types
* [ ] Location