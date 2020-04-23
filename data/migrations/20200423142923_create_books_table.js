
exports.up = function(knex) {
  return knex.schema.createTable('books', tbl => {
      //primary key
      tbl.increments()
      //title, required, string, unique
      tbl.string('title', 255).notNullable().unique();
      //author, required, string
      tbl.string('author', 255).notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('books');
};
