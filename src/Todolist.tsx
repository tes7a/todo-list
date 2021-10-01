import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./Component/AddItemForm";
import {EditableSpan} from './Component/EditableSpan';
import {Button1} from "./Component/Button1";
import {SingleInput} from "./Component/SingleInput";
import {Button, Checkbox} from '@material-ui/core';

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
    const addTask = (title: string) => {
        props.addTask(title, id)
    }

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
        <h3><EditableSpan title={props.title} onChange={changeTitleTodolist}/> <Button1 callBack={removeTodolist}/>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {/*<Input todolistID={todolistID} callBack={props.addTask}/>*/}
            {/*<SingleInput title={title} setTitle={onChangeError} callBack={callBackHandlerInput}*/}
            {/*             todolistID={id}/>*/}
            {/*{error && <div className="error-message">{error}</div>}*/}
            {/*<Button1 callBack={callBackHandlerInput}/>*/}
        </div>
        <div>
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

                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox onChange={onChangeStatusHandler} checked={t.isDone}/>
                        <EditableSpan title={t.title} onChange={onChangeHandler}/>
                        <Button1 callBack={onClickHandler}/>
                    </div>
                })
            }
        </div>
        <div>
            <Button variant={filter === 'all' ? "contained" : "text"} size={"small"}
                    onClick={() => allFilterHandler('all')}>All
            </Button>
            <Button color={"primary"} variant={filter === 'active' ? "contained" : "text"} size={"small"}
                    onClick={() => allFilterHandler('active')}>Active
            </Button>
            <Button color={"secondary"} variant={filter === 'completed' ? "contained" : "text"} size={"small"}
                    onClick={() => allFilterHandler('completed')}>Completed
            </Button>
        </div>
    </div>
}


