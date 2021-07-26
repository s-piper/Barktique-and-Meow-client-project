const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const axios = require('axios');

// PUT routes Edit employee info

router.put(
  '/editEmployee/firstName/v1/:employeeID',
  rejectUnauthenticated,
  async (req, res) => {
    console.log(
      `Full route and body => /api/admin/editEmployee/firstName/v1/:employeeID`
    );

    // Prepare the client to get some work done
    const client = await pool.connect();
    // deconstruct the body!
    const { employee_first_name } = req.body;
    console.log(`Params => `, req.params);
    console.log(`Data coming in => `, String(employee_first_name));
    // employee id from user table column id!
    const emp_id = Number(req.params.employeeID);
    // Query Area
    const updateEmployeeFirst = `
      UPDATE "user" SET employee_first_name=$1
      WHERE id=$2
      ;`;

    // Make sure they belong to this realm!
    if (req.isAuthenticated) {
      try {
        // Welcome
        await client.query('BEGIN');
        const putFirstName = await pool.query(updateEmployeeFirst, [
          employee_first_name,
          Number(emp_id)
        ]);
        await client.query('COMMIT');
        res.sendStatus(201);
      } catch (error) {
        console.log(
          `Sorry we had a problem editing Employee First Name`,
          error
        );
        // Send back a Lost in the Ether Code
        res.sendStatus(500);
      } finally {
        client.release();
      }
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  }
);

module.exports = router;
