import React, {useState} from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "../Component/Task";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLISTS/Task',
    component: Task,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
    },
    args: {
        changeTaskTitle: action('Change task title'),
        changeTaskStatus: action('Change task status'),
        removeTask: action('Remove task'),
    },
} as ComponentMeta<typeof Task>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => {
    const [task,setTask] = useState({id: '1', title: "CSS", isDone: true});

    const changeStatus = () => setTask({id: '1', title: "CSS", isDone: !task.isDone});
    const newArg = {...args,task,changeStatus: () => setTask({id: '1', title: "CSS", isDone: !task.isDone})};
    return <Task {...newArg} />;
};

export const TaskIsDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsDoneStory.args = {
    task: {id: '1', title: "CSS", isDone: true},
};

export const TaskIsNotDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsNotDoneStory.args = {
    task: {id: '1', title: "CSS", isDone: false},
};