import React, {ChangeEvent, useCallback} from "react";
import {Checkbox} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Button1} from "./Button1";
import {TaskType} from "../Todolist";

export type TaskPropsType = {
    task: TaskType,
    removeTask: (taskId: string) => void,
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void,
    changeTaskTitle: (taskId: string, newValue: string) => void
}

export const Task: React.FC<TaskPropsType> = React.memo(({task,removeTask,changeTaskStatus,changeTaskTitle}) => {
    const {id,title,isDone} = task;

    const onClickHandler = useCallback(() => removeTask(id), [removeTask, id]);

    const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus(id, newIsDoneValue);
    }, [changeTaskStatus, id]);

    const onChangeHandler = useCallback((newValue: string) => {
       changeTaskTitle(id, newValue);
    }, [changeTaskTitle, id]);


    return <div className={task.isDone ? "is-done" : ""}>
        <Checkbox onChange={onChangeStatusHandler} checked={task.isDone}/>
        <EditableSpan title={task.title} onChange={onChangeHandler}/>
        <Button1 callBack={onClickHandler}/>
    </div>
});