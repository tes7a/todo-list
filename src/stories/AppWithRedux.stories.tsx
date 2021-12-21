import React, {useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import App from "../App";
import {Provider} from 'react-redux';
import {ReduxStoreProviderDecorator} from "../store/ReduxStoreProviderDecorator";

export default {
    title: 'TODOLISTS/AppWithRedux',
    component: App,

    argTypes: {},
    decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = (args) =><App/>;

export const AppWithReduxStory = Template.bind({});

AppWithReduxStory.args = {};
