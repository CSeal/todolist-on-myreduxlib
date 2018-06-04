import {TODOS_FETCHING, TODOS_ASYNC_ACTION_SET} from '../actions/constans';

export const fetchingReducer = (state = false, action) => {
    const cases = {
        [TODOS_FETCHING](){
            return true;
        },
        [TODOS_ASYNC_ACTION_SET](){
            return false;
        }
    };
    if(action.type in cases){
        return cases[action.type]();
    }
    return state;
};