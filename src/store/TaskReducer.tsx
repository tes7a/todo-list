import {v1} from "uuid";
import {TasksStateType} from "../App";


export const TaskReducer = (state: TasksStateType, action: allTypes): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.todolistID]: state[action.todolistID].filter(f => f.id !== action.id)}
        }
        case 'ADD-TASK': {
            return {
                ...state,
                [action.todolistID]: [...state[action.todolistID], {id: v1(), title: action.title, isDone: false}]
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(m => m.id === action.taskId ? {
                    ...m,
                    title: action.title
                } : m)
            }
        }
        case 'CHANGE-STATUS': {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(m => m.id === action.taskId ? {
                    ...m,
                    isDone: action.isDone
                } : m)
            }
        }
        case 'ADD-TODOLIST' : {
            return {
                ...state,
                [action.id]: []
            }
        }
        default:
            return state
    }
}

export type allTypes = ADDTaskACType | ChangeTaskTitleACType | RemoveTaskACType | ChangeStatusACType | AddTodoListACType

export type RemoveTaskACType = ReturnType<typeof RemoveTaskAC>
export type ChangeTaskTitleACType = ReturnType<typeof ChangeTaskTitleAC>
export type ADDTaskACType = ReturnType<typeof AddTaskAC>
export type ChangeStatusACType = ReturnType<typeof ChangeStatusAC>
export type AddTodoListACType = ReturnType<typeof AddTodoListAC>

export const RemoveTaskAC = (id: string, todolistID: string) => {
    return {
        type: 'REMOVE-TASK',
        id, todolistID
    } as const
}

export const AddTaskAC = (title: string, todolistID: string) => {
    return {
        type: 'ADD-TASK',
        title, todolistID
    } as const
}

export const ChangeTaskTitleAC = (title: string, taskId: string, todolistID: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        title, taskId, todolistID
    } as const
}

export const ChangeStatusAC = (taskId: string, isDone: boolean, todolistID: string) => {
    return {
        type: 'CHANGE-STATUS',
        taskId, isDone, todolistID
    } as const
}

export const AddTodoListAC = (id: string) => {
    return {
        type: 'ADD-TODOLIST',
        id
    } as const
}