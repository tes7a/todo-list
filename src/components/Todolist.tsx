import React, {KeyboardEvent, ChangeEvent, useState} from "react";
import {FilterValuesType} from "../App";
import {v1} from "uuid";

export type TasksTodolist = {
    id: string
    title: string
    isDone: boolean
}

type TodolistType = {
    title: string
    filter: FilterValuesType
    tasks: Array<TasksTodolist>
    removeTasks: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
    addTask: (title: string) => void
}

export function Todolist(props: TodolistType) {
    const [error, setError] = useState<boolean>(false)
    const [newTaskTitle, setNewTaskTitle] = useState<string>("");
    const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            props.addTask(newTaskTitle)
            setNewTaskTitle("")
        }
    }
    const addTask = () => {
        const trimNewTaskTitle = newTaskTitle.trim()
        if (trimNewTaskTitle) {
            props.addTask(trimNewTaskTitle)
        } else {
            setError(true)
        }
        setNewTaskTitle("")
    }

    const onAllClickHandler = () => props.changeFilter("all")
    const onActiveClickHandler = () => props.changeFilter("active")
    const onCompletedClickHandler = () => props.changeFilter("completed")

    const allBtnClass = props.filter === "all" ? "active-filter" : ""
    const activeBtnClass = props.filter === "active" ? "active-filter" : ""
    const completedBtnClass = props.filter === "completed" ? "active-filter" : ""
    const userMessage = error
        ? <div style={{color:"red"}}>Title is required!</div>
        : <div>Enter Name</div>

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onKeyPress={onKeyPressHandler}
                       onChange={onTitleChangeHandler}
                       className={error ? "error" : ""}
                />
                <button onClick={addTask}>+</button>
                {userMessage}
            </div>
            <ul>
                {props.tasks.map(t => {
                    const chengTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked)
                    }
                    const onRemoveHandler = () => {
                        props.removeTasks(t.id)
                    }
                    const doneTasks = t.isDone ? "is-done" : ""

                    return <li key={t.id}
                               className={doneTasks}>
                        <input type="checkbox"
                               checked={t.isDone}
                               onChange={chengTaskStatus}
                        />
                        <span>{t.title}</span>
                        <button onClick={onRemoveHandler}>x</button>
                    </li>
                })}
            </ul>
            <div>
                <button
                    className={allBtnClass}
                    onClick={onAllClickHandler}>
                    All
                </button>
                <button
                    className={activeBtnClass}
                    onClick={onActiveClickHandler}>
                    Active
                </button>
                <button
                    className={completedBtnClass}
                    onClick={onCompletedClickHandler}>
                    Completed
                </button>
            </div>
        </div>
    )
}