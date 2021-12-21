import React, {useState} from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "../Component/Task";

export default {
    title: 'TODOLISTS/Task',
    component: Task,
    argTypes: {
    },
    args: {
        changeTaskTitle: action('Change task title'),
        changeTaskStatus: action('Change task status'),
        removeTask: action('Remove task'),
    },
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => {
    const [task,setTask] = useState({id: '1', title: "CSS", isDone: true});

    const changeStatus = () => setTask({id: '1', title: "CSS", isDone: !task.isDone});
    const newArg = {...args,task,changeStatus: () => setTask({id: '1', title: "CSS", isDone: !task.isDone})};
    return <Task {...newArg} />;
};

export const TaskIsDoneStory = Template.bind({});

TaskIsDoneStory.args = {
    task: {id: '1', title: "CSS", isDone: true},
};

export const TaskIsNotDoneStory = Template.bind({});

TaskIsNotDoneStory.args = {
    task: {id: '1', title: "CSS", isDone: false},
};