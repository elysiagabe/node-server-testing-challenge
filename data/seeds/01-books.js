
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('books').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('books').insert([
        {id: 1, title: 'The God of Small Things', author: 'Arundhati Roy'},
        {id: 2, title: 'How Should a Person Be?', author: 'Sheila Heti'},
        {id: 3, title: 'Potiki', author: 'Patricia Grace'}
      ]);
    });
};
