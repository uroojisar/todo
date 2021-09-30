import { TODO_CREATE, TODO_UPDATE, TODO_DELETE, TODO_FINISH } from '../constants';
import SQLiteScreen from '../utils/sqlite';

const initialState = {
    todos: [],
};
const todoReducer = (state = initialState, action) => {
    switch(action.type) {
        case TODO_CREATE:
            new SQLiteScreen().addTodo(action);
            return [...state, action.payload];
        case TODO_UPDATE:
            new SQLiteScreen().updateTodo(action);
            const todo = action.payload;
            const updatedTodo = {
                task_title : todo.task_title,
                datetime : todo.datetime, 
                inserttime : todo.inserttime, 
                repeat : todo.repeat, 
                category : todo.category
            }
            return [...state.map(todo => todo.inserttime === action.payload.inserttime ? updatedTodo : todo)];
        case TODO_DELETE:
            new SQLiteScreen().deleteByInsertTime(action.payload);
            return [...state.filter(todo => todo.inserttime != action.payload)];
        case TODO_FINISH:
            new SQLiteScreen().markTodoAsFinished(action.payload);
            return [...state.filter(todo => todo.category != "finished")];
        default:
            return state;
    }
}

export default todoReducer;