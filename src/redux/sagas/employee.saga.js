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

// PUT route to start an ORDER
function* putProductOrderIsStarted(action) {
  console.log(`Data for putProductOrderIsStarted => `, action.payload);
  // table "user" SET id => action.payload.id
  // This Saga payload needs to contain this info!
  /**
   * data = {
   *  cus_order_isStarted: true,
   *  cus_progress_status: 'In Progress',
   *  cus_order_number: 'Order Number Here',
   *  id: 'employee id here'
   * }
   */
  try {
    // Inform the backend that employee is ready to start order
    const startOrderButtonResponse = yield axios.put(`/api/employee/startOrder/v1/${action.payload.id}`)
    // Need to do a GET request to get updated info for DOM
    // stating that this order is started
    yield put({type: 'FETCH_ALL_PRODUCT_ORDERS'})
  } catch(error) {
    console.log(`Sorry, this order couldn't be started... `, error)
  }
}

function* employeeSaga() {
  yield takeLatest("FETCH_ALL_PRODUCT_ORDERS", fetchAllProductOrders);
  yield takeLatest('START_ORDER_BUTTON', putProductOrderIsStarted)
}

export default employeeSaga;
