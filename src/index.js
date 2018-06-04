import React, {Fragment} from "react";
import {render} from "react-dom";
import App from './App';
import {Provider} from "./myRedux";
import {getAsyncTodosInAction, requestTodosAction} from './actions'
import {store} from './store';
store.dispatch(getAsyncTodosInAction());
render(<Provider store={store}>
        <App />
       </Provider>, document.getElementById('container'));
