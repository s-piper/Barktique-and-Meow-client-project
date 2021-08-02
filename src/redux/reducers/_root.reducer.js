import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import orders from './orders.reducer';
import {productOrderReducer} from './customerProduct.order.reducer'
import {adminEmployeeInfoReducer} from './admin.reducer'
import {s3ImageHolderReducer} from './s3.reducer'
import {adminIssuesReducer} from './admin.issues.reducer'

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  orders,
  productOrderReducer, // Reducer to handle order from customer
  adminEmployeeInfoReducer, // Reducer to handle employee info
  adminIssuesReducer, // Reducer to handle admin issues page
});

export default rootReducer;
