import {FilterValuesType, TodolistType} from "../App";

export const TodoListReducer = (state: TodolistType[], action: AllTypes): TodolistType[] => {
    switch (action.type) {
        case 'ADD-TODOLIST': {
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

export type AllTypes = AddTodoListACType | ChangeTodoListTitleACType | ChangeFilterACType | RemoveTodoListACType

export type AddTodoListACType = ReturnType<typeof AddTaskTodoListAC>
export type ChangeTodoListTitleACType = ReturnType<typeof ChangeTodoListTitleAC>
export type ChangeFilterACType = ReturnType<typeof ChangeFilterAC>
export type RemoveTodoListACType = ReturnType<typeof RemoveTodoListAC>

export const AddTaskTodoListAC = (title: string, id: string) => {
    return {
        type: 'ADD-TODOLIST',
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