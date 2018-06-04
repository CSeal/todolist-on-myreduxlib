import {todosReducer, todosFilter} from "./todos";
import {filtersReducer} from "./filters";
import {fetchingReducer} from "./fetching";
import {combineReducers} from "../myRedux";

export const rootReducer = combineReducers({
   todos: todosReducer,
   filters: filtersReducer,
   fetching: fetchingReducer
});

export const getFilteredTodos = state => todosFilter(state.todos, state.filters);