import {TODO_FILTER_SET} from '../actions/constans';

export const filtersReducer = (state = 'ALL', action)=>{
  const {payload} = action;
  const cases = {
      [TODO_FILTER_SET](){
          return payload.filterValue;
      }
  };
  if(action.type in cases){
      return cases[TODO_FILTER_SET]();
  }
  return state;
};