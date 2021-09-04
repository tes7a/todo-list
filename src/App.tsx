import React, {useState} from 'react';
import './App.css';
import {TasksTodolist, Todolist} from "./components/Todolist";
import {v1} from 'uuid';


export type FilterValuesType = "all" | "completed" | "active";

function App() {

    let [tasks, setTasks] = useState<Array<TasksTodolist>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
    ]);
    let [filter, setFilter] = useState<FilterValuesType>("all");

    function ChangeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    function RemoveTasks(id: string) {
        let NewFilteredTasks = tasks.filter(t => t.id !== id)
        setTasks(NewFilteredTasks);
    }

    const changeTaskStatus = (taskID: string, isDone: boolean) => {
        const updatedTasks = tasks.map(t => t.id === taskID ? {...t, isDone} : t)
        setTasks(updatedTasks)
    }

    function addTask(title: string) {
        let newTask: TasksTodolist = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks]);
    }

    let TaskForTodoList = tasks;
    if (filter === "completed") {
        TaskForTodoList = tasks.filter(t => t.isDone === true);
    }
    if (filter === "active") {
        TaskForTodoList = tasks.filter(t => t.isDone === false);
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={TaskForTodoList}
                removeTasks={RemoveTasks}
                changeFilter={ChangeFilter}
                addTask={addTask}
                filter={filter}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;
