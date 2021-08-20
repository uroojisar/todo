import { TODO_CREATE, TODO_UPDATE, TODO_DELETE } from '../constants';
import SQLiteScreen from '../utils/sqlite';

const initialState = {
    todos: []
};
const todoReducer = (state = initialState, action) => {
    switch(action.type) {
        case TODO_CREATE:
            new SQLiteScreen().addTodo(action);
            return [...state, action.payload];
        // case TODO_UPDATE:
        //     return {
        //     ...state,
        //     todos: initialState.todos.push(action.payload)
        //     };
        case TODO_DELETE:
            new SQLiteScreen().deleteByInsertTime(action.payload);
            // let newState = state.filter(todo => todo.inserttime != action.payload);
            return [...state.filter(todo => todo.inserttime != action.payload)]
        default:
            return state;
    }
}

export default todoReducer;