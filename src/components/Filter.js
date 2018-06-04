import React from 'react';
import propTypes from 'prop-types';
import FilterLink from './FilterLink';

 export default function Filter(props) {
    return (
        <div className="todo-filter">
            <FilterLink
                icon="list"
                active={props.activeFilter === 'ALL'}
                onClick={() => props.onSetFilter('ALL')}/>
            <FilterLink
                icon="check_box"
                active={props.activeFilter === 'COMPLETED'}
                onClick={() => props.onSetFilter('COMPLETED')}/>
            <FilterLink
                icon="check_box_outline_blank"
                active={props.activeFilter === 'UNCOMPLETED'}
                onClick={() => props.onSetFilter('UNCOMPLETED')}/>
        </div>
    )
}

Filter.propTypes ={
    activeFilter: propTypes.string.isRequired,
    onSetFilter: propTypes.func.isRequired
};
