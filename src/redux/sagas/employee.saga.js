import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// GET route fetchEmployee
function* fetchEmployee() {
  console.log('In fetchEmployee');

  try {
    const employee = yield axios.get("/api/employee/getAllOrders/v1");
    
    yield put({ type: "SET_EMPLOYEE", payload: employee.data });
  } catch(error) {
    console.log("ERROR in fetchEmployee", error);
  }
}

function* employeeSaga() {
  yield takeLatest("FETCH_EMPLOYEE", fetchEmployee);
}

export default employeeSaga;
