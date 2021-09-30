import { 
    TODO_CREATE,
    TODO_DELETE, 
    TODO_UPDATE,
    TODO_FINISH,
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

export function finishTodo (todo) {
    return {
        type: TODO_FINISH,
        payload: todo
    }
}
