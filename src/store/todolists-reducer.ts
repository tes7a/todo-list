import { v1 } from "uuid";
import {FilterValuesType, TodolistType} from "../App";

type AllActionsTypes = RemoveTodolistAT | AddTodolistAT | ChangeTodolistTitleAT | ChangeTodolistFilterAT

type RemoveTodolistAT = {
    type: 'REMOVE-TODOLIST',
    id: string
}

type AddTodolistAT = {
    type: 'ADD-TODOLIST',
    title: string
}

type ChangeTodolistTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}

type ChangeTodolistFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

export const todolistsReducer = (state: TodolistType[], action: AllActionsTypes) : TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST' : {
            return state.filter(tl => tl.id != action.id)
        }
        case 'ADD-TODOLIST' : {
            return [...state, {id: v1(), title: action.title, filter: 'all'}]
        }
        case 'CHANGE-TODOLIST-TITLE' : {
            return state.map(td => td.id === action.id?{...td, title: action.title}: td)
        }
        case 'CHANGE-TODOLIST-FILTER' : {
            return state.map(td => td.id === action.id? {...td, filter: action.filter} : td)
        }
        default:
            throw new Error("I don't understand this type")
    }
}


export const RemoveTodolistAC = (todolistId: string): RemoveTodolistAT => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}
}

export const AddTodoListAC = (title: string): AddTodolistAT => {
    return {type: 'ADD-TODOLIST', title: title}
}

export const ChangeTodoListTitleAC = (id: string,title: string): ChangeTodolistTitleAT => {
    return {
        type: 'CHANGE-TODOLIST-TITLE' as const,
        id: id,
        title: title
    }
}

export const ChangeTodoListFilterAC = (id: string,filter: FilterValuesType): ChangeTodolistFilterAT => {
    return {
        type: 'CHANGE-TODOLIST-FILTER' as const,
        id: id,
        filter: filter
    }
}


