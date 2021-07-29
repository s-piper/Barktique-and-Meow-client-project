import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// GET route to fetch all employee's
function* fetchAllEmployees() {
  console.log(`You're fetching all employee's info minus password`);
  // No data is needed, only the correct way to get in

  try {
    // Send a request to the backend to get our employee info
    const getAllEmployeesResponse = yield axios.get(`/api/admin/getArtists/v1`);

    // Need to set our response to adminEmployeeInfoReducer
    // They know what to do.
    yield put({
      type: 'SET_EMPLOYEE_INFO',
      payload: getAllEmployeesResponse.data,
    });
  } catch (error) {
    console.log(`Sorry, we don't know where the employee's went... `, error);
  }
}

// Watcher SAGA for admin
function* adminWatcherSaga() {
    yield takeLatest('FETCH_EMPLOYEES_FROM_SERVER', fetchAllEmployees)
}

export default adminWatcherSaga;
