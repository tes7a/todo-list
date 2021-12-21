import {TasksStateType, TodolistType} from "../App";
import {addTaskAC, tasksReducer} from "./tasks-reducer";
import {removeTodolistAC, todolistsReducer} from "./todolists-reducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: TodolistType[] = [];

    const action = addTaskAC("new todolist" ) ;

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.id);
    expect(idFromTodolists).toBe(action.id);
});

test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };

    const TestTodolist = [
        {id: "todolistId1", title: 'What to learn', filter: 'all'},
        {id: "todolistId2", title: 'What to buy', filter: 'all'},
    ] as TodolistType[]

    const action = removeTodolistAC("todolistId2");

    const endState = todolistsReducer(TestTodolist, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState[1]).not.toBeDefined();
});
