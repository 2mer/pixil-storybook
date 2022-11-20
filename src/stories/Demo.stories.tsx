import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import App from '../App';

export default {
	title: 'Demo',
	component: App,
} as ComponentMeta<typeof App>;

// @ts-ignore
const Template: ComponentStory<typeof App> = (args) => <App {...args} />;

export const Demo = Template.bind({});
Demo.args = {};
