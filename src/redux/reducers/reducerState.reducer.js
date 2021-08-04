export const ordersState = (state = false, action) => {
  // Switch it up!
  switch (action.type) {
    case 'SET_ORDER_STATE':
      return action.payload;
    default:
      return state;
  }
};


export const singleEmployeeState = (state = false, action) => {
  // Switch it up!
  switch (action.type) {
    case 'SET_SINGLE_EMPLOYEE_STATE':
      return action.payload;
    default:
      return state;
  }
};