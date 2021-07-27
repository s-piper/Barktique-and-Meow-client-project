const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const axios = require('axios');

// GET route Area

router.get(
  '/startOrder/v1/:employeeID',
  rejectUnauthenticated,
  async (req, res) => {
    console.log(
      `Full route and body => /api/employee/startOver/v1/:employeeID`
    );

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

module.exports = router;
