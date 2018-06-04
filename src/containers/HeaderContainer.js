import React from 'react';
import Header from '../components/Header';
import {connect} from '../myRedux';


const mapStateToProps = state => ({
    todos: state.todos
});
const reRenderRule = (oldStateProps, nextStateProps) => {
    let neadUpdate = true;

    if(oldStateProps.todos.length !== nextStateProps.todos.length){
        return neadUpdate;
    }

    for(let i = 0; i < oldStateProps.todos.length; i++){
        neadUpdate = oldStateProps.todos[i].completed !== nextStateProps.todos[i].completed;
        if(neadUpdate){
            return neadUpdate;
        }
    }

    return neadUpdate;
};
const HeaderContainer = connect(mapStateToProps, null, reRenderRule)(Header);
export default HeaderContainer;