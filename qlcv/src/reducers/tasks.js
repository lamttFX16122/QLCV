import * as types from "./../constants/ActionTypes"
var data = JSON.parse(localStorage.getItem("tasks"));
var initialState = data ? data : [];
const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}
const generateID = () => {
    return (
        s4() +
        s4() +
        s4() +
        "-" +
        s4() +
        s4() +
        "-" +
        s4() +
        s4() +
        "-" +
        s4() +
        s4() +
        "-" +
        s4() +
        s4() +
        s4() +
        s4()
    );
}
const findIndexId = (tasks, id) => {
    let resultIndex = -1;
    tasks.findIndex((value, index) => {
        if (value.id === id) {
            resultIndex = index;
        }
    });
    return resultIndex;
}
var myReducer = (state = initialState, action) => {
    var id = '';
    var index = '';
    switch (action.type) {
        case types.LIST_ALL:
            return state;
        case types.SAVE_TASK:

            var newTask = {
                id: action.task.id,
                name: action.task.name,
                status: action.task.status
            };

            if (!newTask.id) {
                newTask.id = generateID();
                state.push(newTask);
            } else {

                index = findIndexId(state, newTask.id);
                state[index] = newTask;

            }

            localStorage.setItem("tasks", JSON.stringify(state))
            return [...state];
        case types.UPDATE_STATUS_TASK:
            id = action.id;
            index = findIndexId(state, id);
            state[index] = {
                ...state[index],
                status: !state[index].status
            }
            localStorage.setItem("tasks", JSON.stringify(state));
            return [...state];
            // Delete
        case types.DELETE_TASK:
            id = action.id;
            index = findIndexId(state, id);
            state.splice(index, 1)
            localStorage.setItem("tasks", JSON.stringify(state));
            return [...state];

        default:
            return state;
    }
}
export default myReducer;