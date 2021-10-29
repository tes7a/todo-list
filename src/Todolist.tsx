import React, {ChangeEvent, useState, KeyboardEvent, useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./Component/AddItemForm";
import {EditableSpan} from './Component/EditableSpan';
import {Button1} from "./Component/Button1";
import {SingleInput} from "./Component/SingleInput";
import {Button, Checkbox} from '@material-ui/core';
import {Task} from "./Component/Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    changeTitleTodolist: (id: string, newTitle: string) => void
    filter: FilterValuesType
}


export const Todolist = React.memo(({id, changeFilter, filter, tasks, ...props}: PropsType) => {
    // let [title, setTitle] = useState("");
    // let [error, setError] = useState<string | null>(null);
    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
    }

    const removeTask = useCallback((taskId: string) => {
        props.removeTask(taskId, id)
    },[props.removeTask,id]);

    const changeTaskStatus = useCallback((taskId: string, newIsDoneValue: boolean) => {
        props.changeTaskStatus(taskId,newIsDoneValue,id)
    },[props.changeTaskStatus, id]);

    const changeTaskTitle = useCallback((taskId: string, newValue: string) => {
        props.changeTaskTitle(taskId,newValue,id)
    },[ props.changeTaskTitle,id])

    const removeTodolist = useCallback(() => props.removeTodolist(id), [props.removeTodolist, id]);

    const changeTitleTodolist = useCallback((newTitle: string) => props.changeTitleTodolist(id, newTitle), [props.changeTitleTodolist, id]);

    const allFilterHandler = useCallback((value: FilterValuesType) => {
        changeFilter(value, id)
    }, [changeFilter, id]);

    const addTask = useCallback((title: string) => {
        props.addTask(title, id)
    }, [props.addTask, id]);

    // const callBackHandlerInput = () => {
    //     if (title.trim() !== "") {
    //         props.addTask(title.trim(), id)
    //         setTitle("")
    //     } else {
    //         setError("Error")
    //     }
    // }

    // const onChangeError = (title: string) => {
    //     setTitle(title)
    //     setError("")
    // }

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
                tasksForTodolist.map(t => {
                   return <Task key={t.id} task={t} removeTask={removeTask} changeTaskStatus={changeTaskStatus} changeTaskTitle={changeTaskTitle}/>
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
});


