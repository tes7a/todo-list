import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./Component/AddItemForm";
import {EditableSpan} from './Component/EditableSpan';
import {Button} from "./Component/Button";
import {SingleInput} from "./Component/SingleInput";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    changeTitleTodolist: (id: string, newTitle: string) => void
    filter: FilterValuesType
}


export function Todolist({id, changeFilter, filter, tasks, ...props}: PropsType) {
    let [title, setTitle] = useState("");
    let [error, setError] = useState<string | null>(null);

    const removeTodolist = () => props.removeTodolist(id)
    const changeTitleTodolist = (newTitle: string) => props.changeTitleTodolist(id, newTitle)
    const allFilterHandler = (value: FilterValuesType) => {
        changeFilter(value, id)
    }
    // const addTask = (title: string) => {
    //     props.addTask(title, id)
    // }

    const callBackHandlerInput = () => {
        if (title.trim() !== "") {
            props.addTask(title.trim(), id)
            setTitle("")
        } else {
            setError("Error")
        }
    }


    const onChangeError = (title: string) => {
        setTitle(title)
        setError("")
    }

    return <div>
        <h3><EditableSpan title={props.title} onChange={changeTitleTodolist}/> <Button callBack={removeTodolist}/>
        </h3>
        {/*<AddItemForm addItem={addTask}/>*/}
        <div>
            {/*<Input todolistID={todolistID} callBack={props.addTask}/>*/}
            <SingleInput title={title} setTitle={onChangeError} callBack={callBackHandlerInput}
                         todolistID={id}/>
            {error && <div className="error-message">{error}</div>}
            <Button callBack={callBackHandlerInput}/>
        </div>
        <ul>
            {
                tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, id)
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, id);
                    }
                    const onChangeHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, id);
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox" onChange={onChangeStatusHandler} checked={t.isDone}/>
                        <EditableSpan title={t.title} onChange={onChangeHandler}/>
                        <Button callBack={onClickHandler}/>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={filter === 'all' ? "active-filter" : ""}
                    onClick={() => allFilterHandler('all')}>All
            </button>
            <button className={filter === 'active' ? "active-filter" : ""}
                    onClick={() => allFilterHandler('active')}>Active
            </button>
            <button className={filter === 'completed' ? "active-filter" : ""}
                    onClick={() => allFilterHandler('completed')}>Completed
            </button>
        </div>
    </div>
}


