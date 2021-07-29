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

// PUT route to edit employee first name
function* putEmployeeFirstName(action) {
  console.log(`Data we need for this route => `, action.payload.data);
  // table "user" SET id => action.payload.id
  // This Saga payload needs to contain this info!
  /**
   * data = {
   *  id: 'admin id here!', <= this id gets you into route
   *  employee_id: 'employee id' This is who's name will change
   *  employee_first_name: 'Name to be changed here'
   * }
   */
  try {
    // Let the backend know we got a first name change coming in.
    // ${id of admin to get into backend here!}
    const employeeFirstNameResponse = yield axios.put(
      `/api/admin/editEmployee/firstName/v1/${action.payload.data.id}`,
      action.payload.data
    );

    // Need to do a GET request to get updated info for DOM
    yield put({ type: 'FETCH_EMPLOYEES_FROM_SERVER' });
  } catch (error) {
    console.log(
      `Hmm, doesn't look like we could change their first name... `,
      error
    );
  }
}

// Watcher SAGA for admin
function* adminWatcherSaga() {
  yield takeLatest('FETCH_EMPLOYEES_FROM_SERVER', fetchAllEmployees);
  yield takeLatest('UPDATE_EMPLOYEE_FIRST_NAME', putEmployeeFirstName)
}

export default adminWatcherSaga;
