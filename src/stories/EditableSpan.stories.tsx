import React, {useState} from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "../Component/EditableSpan";

export default {
    title: 'TODOLISTS/EditableSpan',
    component: EditableSpan,
    argTypes: {},
    args: {},
} as ComponentMeta<typeof EditableSpan>;
const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;


export const EditableSpanStory = Template.bind({});

// @ts-ignore
EditableSpanStory.args = {
    title: 'HTML',
    onChange: action('Value EditableSpan changed')
};
