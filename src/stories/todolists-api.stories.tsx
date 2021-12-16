import React, {useEffect, useState} from 'react'
import {todolistApi} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistApi.getTodos()
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistApi.createTodo("666")
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistApi.deleteTodo('e1fc101d-5cc7-4ccf-ab54-4e6468eba26d')
            .then((res) => {
                debugger
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistApi.updateTodo('66f7b6ec-280f-41eb-828a-a2ea23c7efee', 'j12jo')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const GetTasks = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        debugger;
        todolistApi.getTasks("49bb879c-9eba-4fde-9b3d-44654fe7091b")
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistApi.deleteTask("66f7b6ec-280f-41eb-828a-a2ea23c7efee", '')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTask = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistApi.updateTask("66f7b6ec-280f-41eb-828a-a2ea23c7efee", '')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}