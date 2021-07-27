import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// GetEmployee SAGA
function* fetchEmployee() {
  console.log("in fetch employee");

  try {
    const employee = yield axios.get("/api/employee/getAllOrders/v1");
    console.log(`in fetch employee generator`);
    yield put({ type: "SET_EMPLOYEE", payload: employee.data });
  } catch {
    console.log("ERROR in fetchEmployeeSaga");
  }
}

function* employeeSaga() {
  yield takeLatest("FETCH_EMPLOYEE", fetchEmployee);
}

export default employeeSaga;
