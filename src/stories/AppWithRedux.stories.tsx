import React, {useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import App from "../App";
import {Provider} from 'react-redux';
import {ReduxStoreProviderDecorator} from "../store/ReduxStoreProviderDecorator";


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLISTS/AppWithRedux',
    component: App,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
    decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof App>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof App> = (args) =><App/>;


export const AppWithReduxStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AppWithReduxStory.args = {};
