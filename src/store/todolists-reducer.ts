import {FilterValuesType, TodolistType} from "../App";
import {v1} from 'uuid';

export const todolistsReducer = (state: TodolistType[], action: tsarType) :TodolistType[]=> {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(f=> f.id != action.id)
        }
        case "ADD-TODOLIST": {
            return [...state, {id: v1(), title: action.title, filter: 'all'}]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.id?{...tl, title: action.title} : tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.id? {...tl, filter: action.filter}: tl)
        }
        default: return state
    }
}

export type tsarType = RemoveTodolistActionType | AddTodoListFormActionType | changeTaskTitleActionType | changeFilterActionType

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodoListFormActionType = ReturnType<typeof addTodoListFormAC>
export type changeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type changeFilterActionType = ReturnType<typeof changeFilterAC>

export const removeTodolistAC = (id: string) =>{
    return{
        type: 'REMOVE-TODOLIST',
        id
    }as const
}

export const addTodoListFormAC = (title: string) => {
    return{
        type: 'ADD-TODOLIST',
        title
    }as const
}

export const changeTaskTitleAC = (id: string, title: string) => {
    return{
        type: 'CHANGE-TODOLIST-TITLE',
        id, title
    }as const
}

export const changeFilterAC = (id: string, filter: FilterValuesType) => {
    return{
        type: 'CHANGE-TODOLIST-FILTER',
        id, filter
    }as const
}