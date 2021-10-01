export const sum = (a:number, b: number) => a + b
export const mult = (a:number, b: number) => a * b
export const div = (a:number, b: number) => a / b
export const sub = (a:number, b: number) => a - b

type ActionType = {
    type: "sum" | "mult" | "div" | "sub",
    number: number
}

export const multiTasker = (state: number, action: ActionType) => {
    switch (action.type){
        case "sum": {
            return state + action.number
        }
        case "mult":{
            return state * action.number
        }
        case "div": {
            return state / action.number
        }
        case "sub": {
            return state - action.number
        }
        default: return state
    }
}