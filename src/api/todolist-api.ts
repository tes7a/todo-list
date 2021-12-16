import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'df892076-91e3-4500-b114-8f6e0164dded'
    }
})

type TodoType = {
    id: string,
    addedDate: string,
    order: number,
    title: string,
}

type CommonResponseType<T = {}> = {
    resultCode: number,
    messages: string[],
    fieldsErrors: string[],
    data: T,
}

type TaskType = {
    description: string,
    title: string,
    status: number,
    priority: number,
    startDate: string,
    deadline: string,
    id: string,
    todoListId: string,
    order: number,
    addedDate: string,
}

type GetTasksResponseType = {
    error: string | null,
    totalCount: number,
    items: TaskType[],
}

type UpdateTaskType = {
    description: string,
    title: string,
    status: number,
    priority: number,
    startDate: string,
    deadline: string,
}

export const todolistApi = {
    getTodos() {
        return instance.get<TodoType[]>('todo-lists');
    },
    createTodo(title: string) {
        return instance.post<CommonResponseType<{ item: TodoType }>>('todo-lists', {title},);
    },
    deleteTodo(todolistId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}`);
    },
    updateTodo(todolistId: string, title: string) {
        return instance.put<CommonResponseType>(`todo-lists/${todolistId}`, {title});
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`/todo-lists/${todolistId}/tasks`);
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<CommonResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`);
    },
    updateTask(todolistId: string, taskId: string) {
        return instance.put(`/todo-lists/${todolistId}/tasks/${taskId}`)
    }
}

