const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/order/v1/form/:orderNumber', async (req, res) => {
  console.log(
    `Full route and body => /api/customer/order/v1/form/:orderNumber`,
    req.body
  );
  // Set up client to do some work for us.
  const client = await pool.connect();

  const {
    cus_order_number,
    cus_first_name,
    cus_last_name,
    cus_phone_number,
    cus_email,
    cus_image,
    cus_notes,
    cus_image_owner_rights,
    cus_social_permission,
  } = req.body;

  console.log(`Customer order # => `, cus_order_number);
  // Queries to postgreSQL
  const fetchOrderTable = `
        SELECT * FROM order_table
        WHERE cus_order_number=$1
    ;`;

  const postOrderTable = `
        INSERT INTO order_table
            (
                cus_order_number, cus_first_name, cus_last_name, cus_phone_number,
                cus_email, cus_image, cus_notes, cus_image_owner_rights,
                cus_social_permission
            )
        VALUES
            (
                $1, $2, $3, $4, $5, $6, $7, $8, $9
            )
    ;`;

  // try-catch-finally block
  try {
    // Yo client, time to work
    await client.query('BEGIN');
    // Let's See what our response is...
    const awaitingGetResponse = await pool.query(fetchOrderTable, [
      cus_order_number,
    ]);

    console.log(`What we get from response`, awaitingGetResponse.rows)
    // Check to see if the row exist
    if (awaitingGetResponse.rows.length !== 0) {
      // If this order number exists, We send back a -1 to the SAGA to handle as an error
      // that this order exists, handle error message there.
      console.log(`We got a match`, awaitingGetResponse.rows);
      await client.query('COMMIT');
      res.send([-1]);
    } else if (awaitingGetResponse.rows !== []) {
      console.log(`Our response is => `, awaitingGetResponse.rows);
      // If order number doesn't exist, we get to proceed and make a POST request
      const createPostResponse = await pool.query(postOrderTable, [
        cus_order_number,
        cus_first_name,
        cus_last_name,
        cus_phone_number,
        cus_email,
        cus_image,
        cus_notes,
        cus_image_owner_rights,
        cus_social_permission,
      ]);
      await client.query('COMMIT');
      // Send back a CREATED html status code
      res.sendStatus(201);
    }
  } catch (error) {
    console.log(
      'Sorry we had an error fetching or posting customer upload',
      error
    );
    // Send the customer back a Lost in space HTML code
    res.sendStatus(500);
  } finally {
    client.release();
  }
});

module.exports = router;
