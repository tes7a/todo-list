import {FilterValuesType, TasksStateType, TodolistType} from "../App";
import {AddTodoListACType} from "./TaskReducer";

let initialState: TodolistType[] = [];

export const TodoListReducer = (state = initialState, action: AllTypes): TodolistType[] => {
    switch (action.type) {
        case 'ADD-TASK-TODOLIST': {
            return [...state, {id: action.id, title: action.title, filter: "all"}]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(m => m.id === action.todolistID ? {...m, title: action.title} : m)
        }
        case 'CHANGE-FILTER': {
            return state.map(m => m.id === action.todolistID ? {...m, filter: action.value} : m)
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(f => f.id !== action.todolistID)
        }
        default:
            return state
    }
}

export type AllTypes =
    AddTaskTodoListACType
    | ChangeTodoListTitleACType
    | ChangeFilterACType
    | RemoveTodoListACType
    | AddTodoListACType

export type AddTaskTodoListACType = ReturnType<typeof AddTaskTodoListAC>
export type ChangeTodoListTitleACType = ReturnType<typeof ChangeTodoListTitleAC>
export type ChangeFilterACType = ReturnType<typeof ChangeFilterAC>
export type RemoveTodoListACType = ReturnType<typeof RemoveTodoListAC>

export const AddTaskTodoListAC = (title: string, id: string) => {
    debugger
    return {
        type: 'ADD-TASK-TODOLIST',
        title, id
    } as const
}

export const ChangeTodoListTitleAC = (title: string, todolistID: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        title, todolistID
    } as const
}

export const ChangeFilterAC = (value: FilterValuesType, todolistID: string) => {
    return {
        type: 'CHANGE-FILTER',
        value, todolistID
    } as const
}

export const RemoveTodoListAC = (todolistID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        todolistID
    } as const
}