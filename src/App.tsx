import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./Component/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTaskTodoListAC,
    ChangeFilterAC, ChangeTodoListTitleAC,
    RemoveTodoListAC,

} from "./store/TodoListReducer";
import {
    addTaskAC,
    addTodoListAC,
    changeStatusAC, changeTaskTitleAC,
    removeTaskAC,
    TaskReducer
} from "./store/TaskReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}


function App() {
    const todolists = useSelector<AppRootStateType,TodolistType[]>(state => state.todolists);
    const tasks = useSelector<AppRootStateType,TasksStateType>(state => state.tasks);

    const dispatch = useDispatch();

    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(removeTaskAC(id, todolistId))
    },[dispatch])

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskAC(title,todolistId))
    },[dispatch])

    const changeStatus = useCallback((id: string, isDone: boolean, todolistId: string) => {
        dispatch(changeStatusAC(id,isDone,todolistId))
    },[dispatch]);

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(ChangeFilterAC(value,todolistId))
    },[dispatch]);

    const removeTodolist = useCallback((id: string) => {
        dispatch(RemoveTodoListAC(id))
    },[dispatch]);

    const addTodoListForm = useCallback((title: string) => {
        debugger
        const id = v1()
        dispatch(addTodoListAC(id))
        dispatch(AddTaskTodoListAC(title,id))
    },[dispatch]);

    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(id,newTitle,todolistId))
    },[dispatch]);

    const changeTitleTodolist = useCallback((id: string, newTitle: string) => {
        dispatch(ChangeTodoListTitleAC(newTitle,id))
    },[dispatch]);

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodoListForm}/>
                </Grid>
                <Grid container spacing={4}>
                    {
                        todolists.map(tl => {
                            return <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasks[tl.id]}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTitleTodolist={changeTitleTodolist}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
