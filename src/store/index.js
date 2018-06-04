import {createStore, addThunkPromiseSupport, middlewareApply, combineMiddlewares} from "../myRedux";
import {rootReducer} from "../reducers";
let counter = 0;
const logger = middlewareApply((state, action)=>
    console.log('State --- ',state , ` Action --- ${action.type}`, 'Payload --- ', action.payload.actionCounter)
);
const sayHello = middlewareApply((state, action, name)=>{
    console.log(` Is you wish, my Master ${name} !!!!`);
}, 'Anton');
const actionCounter = middlewareApply((state, action)=>{
    counter++;
    action.payload.actionCounter = counter;
});
const rootMiddleware = combineMiddlewares([logger, sayHello, actionCounter, logger]);
export const store = createStore(rootReducer);
store.dispatch = addThunkPromiseSupport(store);

