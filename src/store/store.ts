import {TaskReducer} from './TaskReducer';
import {TodoListReducer} from './TodoListReducer';
import {combineReducers, createStore} from 'redux';

const rootReducer = combineReducers({
    tasks: TaskReducer,
    todolists: TodoListReducer
})

export const store = createStore(rootReducer);

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;