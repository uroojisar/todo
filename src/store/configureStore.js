import { createStore, combineReducers } from 'redux';
import todoReducer from '../reducers/todoReducer';
const rootReducer = combineReducers(
    // state variable is 'todos' and we'll get its value from the todoReducer
{ todos: todoReducer }
);
const configureStore = (preloadedTodos) => {
    
return createStore(rootReducer, preloadedTodos);
}

export default configureStore;