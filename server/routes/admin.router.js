const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
  rejectNonAdmins,
} = require('../modules/authentication-middleware');
const axios = require('axios');
const { get } = require('./user.router');

// PUT routes Edit employee info

router.put(
  '/editEmployee/firstName/v1/:employeeID',
  rejectUnauthenticated,
  rejectNonAdmins,
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
          Number(emp_id),
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

router.put(
  '/editEmployee/lastName/v1/:employeeID',
  rejectUnauthenticated,
  rejectNonAdmins,
  async (req, res) => {
    console.log(
      `Full route and body => /api/admin/editEmployee/lastName/v1/:employeeID`
    );

    // Prepare the client to get some work done
    const client = await pool.connect();
    // deconstruct the body!
    const { employee_last_name } = req.body;
    console.log(`Params => `, req.params);
    console.log(`Data coming in => `, String(employee_last_name));
    // employee id from user table column id!
    const emp_id = Number(req.params.employeeID);
    // Query Area
    const updateEmployeeLast = `
      UPDATE "user" SET employee_last_name=$1
      WHERE id=$2
      ;`;

    // Make sure they belong to this realm!
    if (req.isAuthenticated) {
      try {
        // Welcome
        await client.query('BEGIN');
        const putLastName = await pool.query(updateEmployeeLast, [
          employee_last_name,
          Number(emp_id),
        ]);
        await client.query('COMMIT');
        res.sendStatus(201);
      } catch (error) {
        console.log(`Sorry we had a problem editing Employee Last Name`, error);
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

router.put(
  '/editEmployee/phoneNumber/v1/:employeeID',
  rejectUnauthenticated,
  rejectNonAdmins,
  async (req, res) => {
    console.log(
      `Full route and body => /api/admin/editEmployee/phoneNumber/v1/:employeeID`
    );

    // Prepare the client to get some work done
    const client = await pool.connect();
    // deconstruct the body!
    const { employee_phone_number } = req.body;
    console.log(`Params => `, req.params);
    console.log(`Data coming in => `, String(employee_phone_number));
    // employee id from user table column id!
    const emp_id = Number(req.params.employeeID);
    // Query Area
    const updateEmployeePhoneNumber = `
      UPDATE "user" SET employee_phone_number=$1
      WHERE id=$2
      ;`;

    // Make sure they belong to this realm!
    if (req.isAuthenticated) {
      try {
        // Welcome
        await client.query('BEGIN');
        const putPhoneNumber = await pool.query(updateEmployeePhoneNumber, [
          employee_phone_number,
          Number(emp_id),
        ]);
        await client.query('COMMIT');
        res.sendStatus(201);
      } catch (error) {
        console.log(
          `Sorry we had a problem editing Employee Phone Number`,
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

router.put(
  '/editEmployee/accessLevel/v1/:employeeID',
  rejectUnauthenticated,
  rejectNonAdmins,
  async (req, res) => {
    console.log(
      `Full route and body => /api/admin/editEmployee/accessLevel/v1/:employeeID`
    );

    // Prepare the client to get some work done
    const client = await pool.connect();
    // deconstruct the body!
    const { employee_access_level } = req.body;
    console.log(`Params => `, req.params);
    console.log(`Data coming in => `, String(employee_access_level));
    // employee id from user table column id!
    const emp_id = Number(req.params.employeeID);
    // Query Area
    const updateEmployeeAccessLevel = `
      UPDATE "user" SET employee_access_level=$1
      WHERE id=$2
      ;`;

    // Make sure they belong to this realm!
    if (req.isAuthenticated) {
      try {
        // Welcome
        await client.query('BEGIN');
        const putAccessLevel = await pool.query(updateEmployeeAccessLevel, [
          employee_access_level,
          Number(emp_id),
        ]);
        await client.query('COMMIT');
        res.sendStatus(201);
      } catch (error) {
        console.log(
          `Sorry we had a problem editing Employee Access Level.`,
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

router.put(
  '/editEmployee/email/v1/:employeeID',
  rejectUnauthenticated,
  rejectNonAdmins,
  async (req, res) => {
    console.log(
      `Full route and body => /api/admin/editEmployee/email/v1/:employeeID`
    );

    // Prepare the client to get some work done
    const client = await pool.connect();
    // deconstruct the body!
    const { username } = req.body;
    console.log(`Params => `, req.params);
    console.log(`Data coming in => `, String(username));
    // employee id from user table column id!
    const emp_id = Number(req.params.employeeID);
    // Query Area
    const updateEmployeeEmail = `
      UPDATE "user" SET username=$1
      WHERE id=$2
      ;`;

    // Make sure they belong to this realm!
    if (req.isAuthenticated) {
      try {
        // Welcome
        await client.query('BEGIN');
        const putEmail = await pool.query(updateEmployeeEmail, [
          username,
          Number(emp_id),
        ]);
        await client.query('COMMIT'); 
        res.sendStatus(201);
      } catch (error) {
        console.log(
          `Sorry we had a problem editing Employee "Email" username.`,
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

// DELETE route
// ****** This route needs an Employee Assigned to an order to test
router.delete(
  '/delete/v1/:employeeID',
  rejectUnauthenticated,
  rejectNonAdmins,
  async (req, res) => {}
);

// GET routes for all employee's
router.get(
  '/getArtists/v1',
  rejectUnauthenticated,
  rejectNonAdmins,
  async (req, res) => {
    console.log(`Full route => /api/admin/getArtists/v1`);
    // Prepare the client to get some work done
    const client = await pool.connect();
    // Query Area
    // We DO NOT want to send back a password, HASHED OR NOT!
    const fetchAllEmployees = `
      SELECT 
      id,
      username,
      employee_access_level,
      employee_first_name,
      employee_last_name,
      employee_phone_number  FROM "user"
      ;`;

    // Make sure they belong to this realm!
    if (req.isAuthenticated) {
      try {
        // Welcome to the Shadow Realm, begin your work!
        await client.query('BEGIN');
        const getAllEmployees = await pool.query(fetchAllEmployees);
        console.log(`All employees => `, getAllEmployees.rows);
        // Send the rows for our Database.
        res.send(getAllEmployees.rows);
      } catch (error) {
        console.log(
          `We had a problem fetching the Employee list from database...`,
          error
        );
        // Send back we can't find our way outta here, http status code....
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
