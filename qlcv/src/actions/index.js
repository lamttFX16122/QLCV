import * as types from "./../constants/ActionTypes";
export const listAll = () => {
    return {
        type: types.LIST_ALL
    }
}

export const saveTask = (task) => {
    return {
        type: types.SAVE_TASK,
        task
    }
}
export const toggleForm = () => {
    return {
        type: types.TOGGLE_FORM
    }
}
export const closeForm = () => {
    return {
        type: types.CLOSE_FORM
    }
}
export const OpenForm = () => {
    return {
        type: types.OPEN_FORM
    }
}
export const updateStatusTask = (id) => {
    return {
        type: types.UPDATE_STATUS_TASK,
        id: id
    }
}
export const updateDeleteTask = (id) => {
    return {
        type: types.DELETE_TASK,
        id: id
    }
}
export const editTask = (task) => {
    return {
        type: types.EDIT_TASK,
        task: task
    }
}
export const filterTable = (filter) => {
    return {
        type: types.FILTER_TABLE,
        filter
    }
}
export const search = (keyword) => {
    return {
        type: types.SEARCH,
        keyword
    }
}
export const sort = (sort) => {
    return {
        type: types.SORT,
        sort
    }
}