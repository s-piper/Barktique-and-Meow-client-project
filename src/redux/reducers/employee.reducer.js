import { combineReducers } from 'redux'

const employee = (state = [], action) => {
    switch (action.type) {
        case 'SET_EMPLOYEE':
        return action.payload;
        default:
            return state;
    }
}



export default combineReducers({employee})