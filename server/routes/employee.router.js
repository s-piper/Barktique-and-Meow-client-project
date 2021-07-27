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
    console.log(`Full route => /api/employee/startOrder/v1/:employeeID`);

    // Prepare the client to get some work done
    const client = await pool.connect();
    console.log(`What's are params => `, req.params.employeeID);
    console.log(`What are data coming from body => `, req.body);
    // Query Area
    const updateStartOrder = `
      UPDATE order_table SET "user_id_ref"=$1, "cus_order_isStarted"=$2, "cus_progress_status"=$3
      WHERE "cus_order_number"=$4
    ;`;

    // Prepare thy self!
    if (req.isAuthenticated) {
      try {
        // Did you grab bring your shield?
        await client.query('BEGIN');
        const putOrderStatusResponse = await pool.query(updateStartOrder, [
          req.params.employeeID,
          req.body.cus_order_isStarted,
          req.body.cus_progress_status,
          req.body.cus_order_number,
        ]);

        await client.query('COMMIT');
        res.sendStatus(201);
      } catch (error) {
        console.log(`Whoa.. Lookin' like we can't start this order`, error);
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

router.get(
  '/productOrder/v1/:employeeID/:orderNumber',
  rejectUnauthenticated,
  async (req, res) => {
    console.log(
      `Full route => /api/employee/productOrder/v1/:employeeID/:orderNumber`
    );
      console.log(`What params we got coming in =>`, req.params)
    const client = await pool.connect();
    // Query Area
    const fetchProductOrder = `
    SELECT * FROM order_table
    WHERE cus_order_number=$1
  ;`;

    // Prepare the client to get some Pool time in
    if (req.isAuthenticated) {
      try {
        // Did you grab you're swim trunks?
        await client.query('BEGIN');
        const fetchOrderResponse = await pool.query(fetchProductOrder, [
          req.params.orderNumber,
        ]);

        console.log(`Order that we've got for you => `, fetchOrderResponse.rows);
        await client.query('COMMIT');
        res.send(fetchOrderResponse.rows);
      } catch (error) {
        console.log(`Hey, we can't grab that product order... `, error);
        // Couldn't find the pool status code.
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
