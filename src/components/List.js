import React from 'react';
import propTypes from 'prop-types';
import Todo from './Todo';

function List({todos, fetching, handleDelete, handleToggle, handleEdit}){

    return (
             <section className="todo-list">
                 {!fetching? todos.map(todo =>
                     <Todo
                         key={todo.id}
                         id={todo.id}
                         title={todo.title}
                         completed={todo.completed}
                         onDelete={handleDelete}
                         onToggle={handleToggle}
                         onEdit={handleEdit}
                     />)
                     : <span>LOADING...</span>
                 }
             </section>
         );
}

List.propTypes = {
    todos: propTypes.array.isRequired,
    fetching: propTypes.bool.isRequired,
    handleDelete: propTypes.func.isRequired,
    handleToggle: propTypes.func.isRequired,
    handleEdit:propTypes.func.isRequired
};

export default List;