import React from 'react';
import propTypes from 'prop-types';
import Stats from './Stats';
import Stopwatch from './Stopwatch';

function Header({todos}){
        return (
            <header>
                <Stats todos={todos} />
                <h1>Redux Todo</h1>
                <Stopwatch />
            </header>
        );

}

Header.propTypes = {
    todos: propTypes.array.isRequired
};

export default Header;