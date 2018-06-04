/*-------------------------------------My helpers---------------------------------------------------------------*/
import axios from "axios";

function memoizee(fn){
    const cache = {};
    return function(...args){
        const key = JSON.stringify(args);
        if(cache[key]){
            return cache[key];
        }
        return cache[key] = fn.apply(this, args);
    }
}
/*-------------------------------My React-Redux Library------------------------------------------------------*/

import React, {Fragment} from "react";
import {isFunction} from 'lodash';

const MyReduxContext = React.createContext();
export function Provider({store ,children}){
    return(
        <MyReduxContext.Provider value={{store}}>
            <Fragment>
                {children}
            </Fragment>
        </MyReduxContext.Provider>
    )
}

export function connect(stateToProps, dispatchToProps, updateRuleFunc){
     return (ConsumerComponent)=>{
         const props = Object.assign({}, ConsumerComponent.props);
         return function ContextConsumer(){
             return(
                 <MyReduxContext.Consumer>
                     {context => (<ReduxConnectUpdateWrapper consumerComponent={ConsumerComponent}
                                                             store={context.store}
                                                             consumerComponentProps={props}
                                                             stateToProps = {stateToProps}
                                                             dispatchToProps = {dispatchToProps}
                                                             updateRuleFunc = {updateRuleFunc}                                   />)}
                 </MyReduxContext.Consumer>
             )
         }
     }
}

class ReduxConnectUpdateWrapper extends React.Component{
    componentDidMount(){
        this.unsubscribe = this.props.store.subscribe(()=>this.forceUpdate());
    }

    componentWillUnmount(){
        this.unsubscribe();
    }
    render(){
        const {consumerComponent, consumerComponentProps, store, stateToProps, dispatchToProps, updateRuleFunc} = this.props,
        stateProps = typeof(stateToProps)==='function'? stateToProps(store.getState()) : {},
        dispatchProps = typeof(dispatchToProps) === 'function'?dispatchToProps(store.dispatch) : {};
        return <ConsumerComponentRender stateProps = {stateProps}
                                        dispatchProps = {dispatchProps}
                                         ConsumerComponent = {consumerComponent}
                                         consumerComponentProps = {consumerComponentProps}
                                         updateRuleFunc={updateRuleFunc}/>
    }
}

class ConsumerComponentRender extends React.Component{
    shouldComponentUpdate(nextProps){
        const nextStateProps = this.getStateProps(nextProps.stateProps);
        const oldStateProps = this.getStateProps(this.props.stateProps);
        let neadUpdate = true;
        if(typeof(this.props.updateRuleFunc) === 'function' &&
            typeof(neadUpdate = this.props.updateRuleFunc(oldStateProps, nextStateProps)) === 'boolean'){
            return neadUpdate
        }

        return this.defaultUpdateRule(oldStateProps, nextStateProps);
    }
    getStateProps(stateProps){
        return (stateProps.join)? [...stateProps]:
            typeof(stateProps) === 'object'? Object.assign({}, stateProps): stateProps;
    }

    defaultUpdateRule(oldStateProps, nextStateProps){
        return true;
    }

    render(){
        const {stateProps, dispatchProps, ConsumerComponent, consumerComponentProps} = this.props;
        return (
            <ConsumerComponent {...stateProps} {...dispatchProps} {...consumerComponentProps}/>
        )
    }
}

/*------------------------------My Redux Library---------------------------------*/
const createAction = type => (payload  = {}) => ({type, payload});
const createThunkAction = callback => payload => dispatch => callback(dispatch, payload);
const createAjaxAction = (type, url, method = 'get') =>{
    if(!['get', 'post', 'patch', 'delete', 'put'].some(arrayValue => arrayValue === method.toString())){
        method = 'get';
    }
    return payload => dispatch =>{
        const config = {method, url};
        if(payload){
            config.data = payload;
        }
        if(['patch', 'delete', 'put'].some(arrayValue => arrayValue === method) && payload.id){
            config.url+= `/${payload.id}`;
        }
        dispatch(axios(config).then(response => response.data).then(data =>({type, payload:data})))
    }
};

const combineReducers = (reducers)=>{
    const exportReducer = {};
    let propertyCount = 0;
    for(let key in reducers){
        if(reducers.hasOwnProperty(key) && typeof(reducers[key]) === 'function'){
            exportReducer[key] = reducers[key];
            ++propertyCount;
        }
    }
    if(!propertyCount){
        return false;
    }
    return (state = {}, action)=>{
        for(let key in exportReducer){
            if(exportReducer.hasOwnProperty(key)){
                state[key] = exportReducer[key](state[key], action);
            }
        }
        return state;
    }};

function combineMiddlewares(middlewaresArray){
    if(!middlewaresArray.join || middlewaresArray.filter(middleware => typeof(middleware) === 'function').length === 0){
        return false;
    }
    return function(state, action){
        middlewaresArray.forEach(middleware => middleware(Object.assign({}, state), action));
    }
}

function middlewareApply(func, ...args){
    if(typeof(func) !== 'function') {
        return false;
    }
    return function(state, action){
        if(action.type !== '@@INIT'){
            func.apply(null, [state, action, ...args]);
        }
    }
}


function createStore(reducer, state, middleware){
    if(typeof(reducer) !== 'function') {
        return false;
    }
    const _middleware = typeof(middleware) === 'function'? middleware : false;

    let _state = state,_callbacks = [];
    const _reducer = reducer;
    const dispatch = (action) => {
        if(_middleware){
            _middleware(Object.assign({}, _state), action);
        }
            _state = _reducer(_state, action);
        _callbacks.forEach(callback => callback());
    };
    const getState = ()=>_state;
    const subscribe = (callback) => {
        if(typeof(callback) === 'function'){
            _callbacks.push(callback);
            return () => {
                _callbacks = _callbacks.filter(callbackFunc => callbackFunc !== callback);
            }
        }
    };
    dispatch({type:'@@INIT', payload: {}});
    return{getState, dispatch, subscribe};

}
//thunk подход
const addThunkPromiseSupport = store =>{
    const dispatch = store.dispatch;
    return action =>{
        if(action instanceof Promise){
             action.then(actionObj=>store.dispatch(actionObj)).catch(console.log);
        }else if(isFunction(action)){
             action(store.dispatch);
        }else{
            dispatch(action);
        }
    }
};
export {createStore, combineReducers, createAction, createAjaxAction, createThunkAction, addThunkPromiseSupport, middlewareApply, combineMiddlewares};
/*--------------------------------------Test Area-----------------------------------*/
/*
const reducerA = (state = {name: 'Vasya', gender: 'male'}, action)=>{
  switch(action.type){
      case 'NAME_SET':{
          return Object.assign({}, state, {name:action.payload.name});
      }
      default:
          return state
  }
};

const reducerB = (state = {schoolNumber: '116', adress: 'Sheronincev 116/9'}, action)=>{
    switch(action.type){
        case 'NUMBER_SET':{
            return Object.assign({}, state, {schoolNumber:action.payload.schoolNumber});
        }
        case 'ADDRES_SET':{
            return Object.assign({}, state, {adress:action.payload.adress});
        }
        default:
            return state
    }
};

const reducerS = combineReducers({
    pupleReducer:reducerA,
    schoolReducer:reducerB
});

const Store = createStore(reducerS);
console.log(Store.getState());
Store.dispatch({type:'NAME_SET', payload:{name: 'Fedya'}});
console.log(Store.getState());
Store.dispatch({type:'NUMBER_SET', payload:{schoolNumber: '245'}});
console.log(Store.getState());
*/
