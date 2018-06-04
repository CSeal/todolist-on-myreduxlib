import {createAction ,createAjaxAction, createThunkAction} from "../myRedux";
import * as actionConst from "./constans";

/*export const addTodoAction = createAction(actionConst.TODO_ADD);
export const deleteTodoAction = createAction(actionConst.TODO_DELETE);
export const editTodoAction = createAction(actionConst.TODO_EDIT);
export const toggleTodoAction = createAction(actionConst.TODO_TOGGLE);*/
export const onSetFilterAction = createAction(actionConst.TODO_FILTER_SET);
const setTodosFromAJAXAction = createAjaxAction(actionConst.TODOS_ASYNC_ACTION_SET, '/api/todos');
const requestTodosAction = createAction(actionConst.TODOS_FETCHING);
export const getAsyncTodosInAction = createThunkAction((dispatch, payload)=>{
    dispatch(requestTodosAction());
    setTimeout(()=>dispatch(setTodosFromAJAXAction()), 3000);
});
export const toggleTodoAction = createAjaxAction(actionConst.TODO_TOGGLE, '/api/todos', 'patch');
export const addTodoAction = createAjaxAction(actionConst.TODO_ADD, '/api/todos', 'post');
export const deleteTodoAction = createAjaxAction(actionConst.TODO_DELETE, '/api/todos', 'delete');
export const editTodoAction = createAjaxAction(actionConst.TODO_EDIT, '/api/todos', 'put');

