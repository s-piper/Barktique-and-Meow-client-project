import { combineReducers } from 'redux'

const employee = (state = [], action) => {
    switch (action.type) {
        case 'SET_EMPLOYEE':
        return action.payload;
        default:
            return state;
    }
}

const newEmployee = (state = [], action) => {
    switch (action.type) {
        case 'ADD_EMPLOYEE':
            return action.payload;
            default:
                return state;
    }
}

export default combineReducers({employee, newEmployee})