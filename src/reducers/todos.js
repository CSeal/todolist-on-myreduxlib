import * as actionConst from "../actions/constans";

const initialState = [
    {
        id: 1,
        title: 'Изучить JavaScript',
        completed: true
    },
    {
        id: 2,
        title: 'Изучить React',
        completed: true
    },
    {
        id: 3,
        title: 'Изучить Redux',
        completed: false
    },
    {
        id: 4,
        title: 'Написать приложение',
        completed: false
    }
];

const todoReducer = function(todo = {}, action){
    const {payload} = action;
    const cases = {
        [actionConst.TODO_ADD](){
            return {
                id: payload.id,
                title: payload.title,
                completed: false
            }
        },
        [actionConst.TODO_EDIT](){
            if (todo.id !== payload.id) {
                return todo;
            }

            return Object.assign({}, todo, {
                title: payload.title
            });
        },
        [actionConst.TODO_TOGGLE](){
            if (todo.id !== payload.id) {
                return todo;
            }

            return Object.assign({}, todo, {
                completed: !todo.completed
            });
        }
    };

    if(action.type in cases){
        return cases[action.type]();
    }
    return todo;
};
export const todosReducer = function(state = [], action){
    const prevState = [...state];
    const {payload} = action;

    const cases = {
        [actionConst.TODOS_ASYNC_ACTION_SET](){
            return this[actionConst.TODOS_SET]();
        },
        [actionConst.TODOS_SET](){
            return payload ? payload : state;
        },
        [actionConst.TODO_ADD](){
/*            const payloadWitchId = Object.assign({}, payload, {id: state.length + 1});
            const todoAddaction = Object.assign({}, action, {payload: payloadWitchId});*/
            return [...prevState, todoReducer(undefined, action)];
        },
        [actionConst.TODO_DELETE](){
            //const index = prevState.findIndex(todo=>todo.id === payload.id);
            return payload.id ? [...prevState.slice(0, payload.id), ...prevState.slice(parseInt(payload.id) + 1)] : state;
        },
        [actionConst.TODO_EDIT](){
            return payload.id ? prevState.map(todo => todoReducer(todo, action)) : state;
        },
        [actionConst.TODO_TOGGLE](){
            return payload.id ? prevState.map(todo => todoReducer(todo, action)): state;
        }
    };

    if(action.type in cases){
        return cases[action.type]();
    }
    return state;
};

export const todosFilter =(state, filters)=> {
    switch (filters) {
        case 'All':
            return state;
        case 'COMPLETED':
            return state.filter(todo => todo.completed);
        case 'UNCOMPLETED':
            return state.filter(todo => !todo.completed);
        default:
            return state
    }
};