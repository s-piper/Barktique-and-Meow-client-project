const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const axios = require('axios');

// PUT route Area

router.put(
  '/startOrder/v1/:employeeID',
  rejectUnauthenticated,
  async (req, res) => {
    console.log(`Full route => /api/employee/startOver/v1/:employeeID`);

    // Prepare the client to get some work done
    const client = await pool.connect();

    // Query Area
    const updateStartOrder = `
      UPDATE order_table SET user_id_ref=$1 and cus_order_isStarted=$2 and cus_progress_status=$3
    ;`;

    if (req.isAuthenticated) {
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  }
);

// GET route order_table

router.get('/getAllOrders/v1', rejectUnauthenticated, async (req, res) => {
  console.log(`Full route => /api/employee/getAllOrders/v1`);

  // Prepare the client to get some work done
  const client = await pool.connect();

  // Query Area
  const fetchAllOrders = `
    SELECT * FROM order_table
  ;`;

  // Do you belong here?
  if (req.isAuthenticated) {
    // Looks like you made it in.
    try {
      const fetchOrdersResponse = await pool.query(fetchAllOrders);
      console.log(`Response from order_table => `, fetchOrdersResponse.rows);
      // Send back our response
      await client.query('COMMIT');
      res.send(fetchOrdersResponse.rows);
    } catch (error) {
      console.log(
        `Hey Capt. Looks like there's we can't grab the orders`,
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
});

module.exports = router;
