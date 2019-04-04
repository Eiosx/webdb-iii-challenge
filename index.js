const express = require('express');
const helmet = require('helmet');

const knex = require('knex');
const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

const server = express();
const parser = express.json();

server.use(parser);
server.use(helmet());

const PORT = 3000;

//ENDPOINTS

server.post('/api/cohorts', (req, res) => {
    const cohort = req.body;
    db.insert(cohort)
      .into('cohorts')
      .then(response => {
          res.status(201).json(response);
      })
      .catch(err => {
          res.status(500).json({
              errorMessage: 'Could not insert cohort.'
          });
      });
});

server.get('/api/cohorts', (req,res) => {
    db('cohorts')
      .then(response => {
          res.json(response);
      })
      .catch(err => {
          res.status(500).json({
              errorMessage: 'Could not get cohorts.'
          });
      });
});

server.get('/api/cohorts/:id', (req, res) => {
    const { id } = req.params;

    db('cohorts')
      .where({id})
      .then(cohort => {
          res.json(cohort);
      })
      .catch(err => {
          res.status(500).json({
              errorMessage: `Could not get cohort with id:${id}`
          });
      });
});

server.get('/api/cohorts/:id/students', (req, res) => {
    const { id } = req.params;

    db('students')
      .where({cohort_id : id})
      .then(students => {
          res.json(students);
      })
      .catch(err => {
          res.status(500).json({
              errorMessage: `Could not get students for cohort_id:${id}`
          });
      });
});

server.put('/api/cohorts/:id', (req, res) => {
    const { id } = req.params;
    const cohortChanges = req.body;

    db('cohorts')
      .where({ id })
      .update(cohortChanges)
      .then(response => {
          res.json(response);
      })
      .catch(err => {
          res.status(500).json({
              errorMessage: `Could not update cohort with id:${id}`
          });
      });
});

server.delete('/api/cohorts/:id', (req, res) => {
    const { id } = req.params;

    db('cohorts')
      .where({ id })
      .del()
      .then(response => {
          res.json(response);
      })
      .catch(err => {
          res.status(500).json({
              errorMessage: `Could not delete cohort with id:${id}`
          });
      });
});









server.listen(PORT, function() {
    console.log(`\n API Listening on http://localhost:${PORT}\n`);
})