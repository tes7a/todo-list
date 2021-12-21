import React from 'react';
import {AddItemForm} from "../Component/AddItemForm";
import {action} from "@storybook/addon-actions";
import {ComponentMeta} from '@storybook/react';
import {ComponentStory} from "@storybook/react";


export default {
    title: 'TODOLISTS/AddItemForm',
    component: AddItemForm,

    argTypes: {
        addItem: {
            description: 'callback'
        }
    },
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormStory = Template.bind({});

AddItemFormStory.args = {
    addItem: action('Button inside form clicked')
};