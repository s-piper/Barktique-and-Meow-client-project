import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// GetEmployee SAGA
function* fetchEmployee() {
  console.log("in fetch employee");

  try {
    const employee = yield axios.get("/getAllOrders/v1");
    console.log(`in fetch employee generator`);
    yield put({ type: "SET_EMPLOYEE", payload: employee.data });
  } catch {
    console.log("ERROR in fetchEmployeeSaga");
  }
}
//POST EMPLOYEE SAGA
function* addEmployee(action) {
    try {
        //change this route
      yield axios.post("api/employee", action.payload);
      yield put({ type: "FETCH_EMPLOYEE" });
    } catch (error) {
      console.error(`${error} in POST`);
    }
  }

function* employeeSaga() {
  yield takeLatest("FETCH_EMPLOYEE", fetchEmployee);
  yield takeLatest("ADD_EMPLOYEE", addEmployee);
}

export default employeeSaga;
