import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./Component/AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: TaskType[]
}


function App() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    });


    function removeTask(id: string, todolistId: string) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(f => f.id !== id)});
    }

    function addTask(title: string, todolistId: string) {
        setTasks({...tasks, [todolistId]: [...tasks[todolistId], {id: v1(), title: title, isDone: false}]});
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(m => m.id === id ? {...m, isDone: isDone} : m)});;
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        setTodolists(todolists.map(m => m.id === todolistId ? {...m, filter: value} : m))
    }

    function removeTodolist(id: string) {
        setTodolists(todolists.filter(f => f.id !== id))
    }

    function addTodoListForm(title: string) {
        let todolist: TodolistType = {
            id: v1(),
            filter: "all",
            title: title
        }
        setTodolists([todolist, ...todolists])
        setTasks({...tasks, [todolist.id]: []})
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(m => m.id === id ? {...m, title: newTitle} : m)})
    }

    function changeTitleTodolist(id: string, newTitle: string) {
        setTodolists(todolists.map(m => m.id === id? {...m,title: newTitle}: m))
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodoListForm}/>
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

                    return <Todolist
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
                })
            }

        </div>
    );
}

export default App;
