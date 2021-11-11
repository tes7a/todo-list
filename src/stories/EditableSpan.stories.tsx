import React, {useState} from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "../Component/EditableSpan";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLISTS/EditableSpan',
    component: EditableSpan,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
    args: {},
} as ComponentMeta<typeof EditableSpan>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;


export const EditableSpanStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
// @ts-ignore
EditableSpanStory.args = {
    value: 'HTML',
    onChange: action('Value EditableSpan changed')
};
