import * as types from "./../constants/ActionTypes"
var initialState = false;
var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.TOGGLE_FORM:
            return state = !state;
        case types.CLOSE_FORM:
            return state = false;
        case types.OPEN_FORM:
            return state = true;
        default:
            return state;
    }
}
export default myReducer;