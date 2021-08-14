import { TODO_CREATE, TODO_UPDATE, TODO_DELETE } from '../constants';

const initialState = {
    // todos: [{
    //     task_id: 1,
    //     task_title: "Sample todo",
    // }]
    todos: []
};
const todoReducer = (state = initialState, action) => {
    switch(action.type) {
        // case TODO_CREATE:
        //     console.log("action.payload: ", action.payload);
        //     return {
        //     ...state,
        //     todos: initialState.todos.push(action.payload)
        //     };
        // case TODO_UPDATE:
        //     return {
        //     ...state,
        //     todos: initialState.todos.push(action.payload)
        //     };
        // case TODO_DELETE:
        //     return {
        //     ...state,
        //     todos: initialState.todos.push(action.payload)
        //     };
        default:
            console.log("Default state in reducer: ", state);
            // console.log("Props in reducer: ", );
            return state;
    }
}

export default todoReducer;