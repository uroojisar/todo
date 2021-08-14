import { 
    TODO_CREATE,
    TODO_DELETE, 
    TODO_UPDATE,
  } from '../constants';

export function createTodo (todo) {
      return {
          type: TODO_CREATE,
          payload: todo
      }
  }

export function deleteTodo (todoID) {
    return {
        type: TODO_DELETE,
        payload: todoID
    }
}

export function updateTodo (todo) {
    return {
        type: TODO_UPDATE,
        payload: todo
    }
}

