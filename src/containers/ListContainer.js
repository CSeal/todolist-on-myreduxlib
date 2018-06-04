import React from 'react';
import List from  '../components/List';
import {deleteTodoAction, editTodoAction, toggleTodoAction} from "../actions";
import {connect} from '../myRedux';
import {getFilteredTodos} from '../reducers'
const mapStateToProps = state => ({
    todos: getFilteredTodos(state),
    fetching: state.fetching
});
const mapDispatchToProps = dispatch => ({
    handleDelete: id => dispatch(deleteTodoAction({id})),
    handleToggle: id => dispatch(toggleTodoAction({id})),
    handleEdit: (id, title) => dispatch(editTodoAction({id, title}))
});
const ListContainer = connect(mapStateToProps, mapDispatchToProps)(List);
export default ListContainer;