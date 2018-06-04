import React from 'react';

import HeaderContainer from './containers/HeaderContainer';
import ListContainer from './containers/ListContainer';
import FormConnect from './containers/FormContainer';
import FilterContainer from './containers/FilterContainer';
import './app.css';
function App(props){
    return (
        <main>
            <HeaderContainer />
            <FilterContainer/>
            <ListContainer/>
            <FormConnect />
        </main>
    );
}

export default App;
