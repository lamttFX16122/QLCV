import { combineReducers } from 'redux';
import tasks from './tasks';
import displayForm from './displayForm';
import itemediting from './itemediting';
import filterTable from './filterTable';
import search from './search';
import sort from './sort';
var myReducer = combineReducers({
    tasks: tasks,
    displayForm: displayForm,
    itemediting: itemediting,
    filterTable: filterTable,
    search: search,
    sort: sort
});
export default myReducer;