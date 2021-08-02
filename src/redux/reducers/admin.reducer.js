export const adminEmployeeInfoReducer = (state = [], action) => {
  // Switch it up!
  switch (action.type) {
    case 'SET_EMPLOYEE_INFO':
      return action.payload;
    case 'FETCH_EMPLOYEE_INFO':
      return state;
    default:
      return state;
  }
};
