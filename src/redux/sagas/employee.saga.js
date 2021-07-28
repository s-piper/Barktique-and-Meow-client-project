import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// GET route fetch all orders
function* fetchAllProductOrders() {
  console.log('In fetchAllProductOrders');

  try {
    // Hit the backend with a get route to grab all orders
    const getAllOrdersResponse = yield axios.get("/api/employee/getAllOrders/v1");
    // Set our reducer with all orders from database
    yield put({ type: "SET_ALL_PRODUCT_ORDERS", payload: getAllOrdersResponse.data });
  } catch(error) {
    console.log('ERROR in fetchAllProductOrders => ', error);
  }
}

function* employeeSaga() {
  yield takeLatest("FETCH_ALL_PRODUCT_ORDERS", fetchAllProductOrders);
}

export default employeeSaga;
