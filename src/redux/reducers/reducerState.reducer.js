export const ordersState = (state = false, action) => {
  // Switch it up!
  switch (action.type) {
    case 'SET_ORDER_STATE':
      return action.payload;
    default:
      return state;
  }
};
