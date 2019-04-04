
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Dude', cohort_id: 3},
        {name: 'Guy', cohort_id: 2},
        {name: 'Buddy', cohort_id: 1}
      ]);
    });
};
