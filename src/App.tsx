import React, {useReducer} from 'react';
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
    TodoListReducer
} from "./store/TodoListReducer";
import {
    addTaskAC,
    addTodoListAC,
    changeStatusAC, changeTaskTitleAC,
    removeTaskAC,
    TaskReducer
} from "./store/TaskReducer";

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
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchTodolists] = useReducer(TodoListReducer,[
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, dispatchTasks] = useReducer(TaskReducer,{
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "Whiskey", isDone: true},
            {id: v1(), title: "Tomatos", isDone: true},
            {id: v1(), title: "Book", isDone: false},
        ]
    });


    function removeTask(id: string, todolistId: string) {
        dispatchTasks(removeTaskAC(id, todolistId))
    }

    function addTask(title: string, todolistId: string) {
        dispatchTasks(addTaskAC(title,todolistId))
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        dispatchTasks(changeStatusAC(id,isDone,todolistId))
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatchTodolists(ChangeFilterAC(value,todolistId))
    }

    function removeTodolist(id: string) {
        dispatchTodolists(RemoveTodoListAC(id))
    }

    function addTodoListForm(title: string) {
        const id = v1()
        dispatchTasks(addTodoListAC(id))
        dispatchTodolists(AddTaskTodoListAC(title,id))
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        dispatchTasks(changeTaskTitleAC(id,newTitle,todolistId))
    }

    function changeTitleTodolist(id: string, newTitle: string) {
        dispatchTodolists(ChangeTodoListTitleAC(newTitle,id))
    }

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
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                            }

                            return <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
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
