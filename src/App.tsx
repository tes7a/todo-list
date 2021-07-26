import React, {useState} from 'react';
import './App.css';
import {TasksTodolist, Todolist} from "./components/Todolist";

export type FilterValuesType = "all" | "completed" | "active";

function App() {

    let [tasks, setTasks] = useState<Array<TasksTodolist>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Redux", isDone: false},
    ]);
    let [filter, setFilter] = useState<FilterValuesType>("all");

    function ChangeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    function RemoveTasks(id: number) {
        let NewFilteredTasks = tasks.filter(t => t.id !== id)
        setTasks(NewFilteredTasks);
    }

    let TaskForTodoList = tasks;
    if (filter === "completed") {
        TaskForTodoList = tasks.filter(t => t.isDone === true);
    }
    if (filter === "active") {
        TaskForTodoList = tasks.filter(t => t.isDone === false);
    }
    // const tasks2 = [
    //     {id: 1, title: "Hello world", isDone: true},
    //     {id: 2, title: "I am Happy", isDone: false},
    //     {id: 3, title: "Yo", isDone: false},
    // ]

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={TaskForTodoList}
                removeTasks={RemoveTasks}
                changeFilter={ChangeFilter}
            />
            {/*<Todolist title="Songs" tasks={tasks2}/>*/}
            {/*/!*<Todolist title="Books"/>*!/*/}
        </div>
    );
}

export default App;
