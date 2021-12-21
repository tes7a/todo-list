import React, {ChangeEvent, useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolists-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null);

    useEffect(() => {
        todolistAPI.getTodoLists()
            .then((res) => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null);
    const [title, setTitle] = useState<string>('');


    const createTodolist = () => {
        todolistAPI.createTodoList(title)
            .then((res) => setState(res.data))
    }

    const titleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"Title"} value={title} onChange={titleOnChange}/>
            <button onClick={createTodolist}>Create Todolist</button>
        </div>
    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');

    const deleteTodolist = () => {
        todolistAPI.deleteTodoList(todolistId)
            .then((res) => setState(res.data))
    }

    const todoListOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"TodolistId"} value={todolistId} onChange={todoListOnChange}/>
            <button onClick={deleteTodolist}>Delete Todolist</button>
        </div>
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('');
    const [title, setTitle] = useState<string>('');

    const upDateTodolist = () => {
        todolistAPI.updateTodoList(todolistId, title)
            .then((res) => setState(res.data))
    }

    const todoListOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    const titleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"TodoListId"} value={todolistId} onChange={todoListOnChange}/>
            <input placeholder={"Title"} value={title} onChange={titleOnChange}/>
            <button onClick={upDateTodolist}>Update Todolist</button>
        </div>
    </div>
}

export const GetTask = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');

    const getTask = () => {
        todolistAPI.getTasks(todolistId)
            .then((res) => setState(res.data))
    }

    const todoListWatcher = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"TodoListId"} value={todolistId} onChange={todoListWatcher}/>
            <button onClick={getTask}>Get Task</button>
        </div>
    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null);
    const [title, setTitle] = useState<string>('');
    const [todolistId, setTodolistId] = useState<string>('');

    const createTask = () => {
        todolistAPI.createTask(todolistId, title)
            .then((res) => setState(res.data))
    }


    const titleWatcher = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const todoListWatcher = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"Title"} value={title} onChange={titleWatcher}/>
            <input placeholder={"TodoListId"} value={todolistId} onChange={todoListWatcher}/>
            <button onClick={createTask}>Create Task</button>
        </div>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null);
    const [taskId, setTaskId] = useState<string>('');
    const [todolistId, setTodolistId] = useState<string>('');

    const deleteTask = () => {
        todolistAPI.deleteTask(todolistId, taskId)
            .then((res) => setState(res.data))
    }

    const onChangeHandlerForTaskId = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value)
    }

    const onChangeHandlerForTodolist = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={"taskId"} value={taskId} onChange={onChangeHandlerForTaskId}/>
            <input placeholder={"todolistId"} value={todolistId} onChange={onChangeHandlerForTodolist}/>
            <button onClick={deleteTask}>-</button>
        </div>
    </div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');
    const [taskId, setTaskId] = useState<string>('');
    const [title, setTitle] = useState<string>('');

    const updateTask = () => {
        todolistAPI.updateTask(todolistId, taskId, title)
            .then((res) => setState(res.data))
    }
    const onChangeHandlerForTodolist = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    const onChangeHandlerForTaskId = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value)
    }

    const onChangeHandlerForTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={onChangeHandlerForTodolist}/>
            <input placeholder={"taskId"} value={taskId} onChange={onChangeHandlerForTaskId}/>
            <input placeholder={"title"} value={title} onChange={onChangeHandlerForTitle}/>
            <button onClick={updateTask}>Update Task</button>
        </div>
    </div>
}