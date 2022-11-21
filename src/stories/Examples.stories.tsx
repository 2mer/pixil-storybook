import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import BaseEditorDemo from './BaseEditorDemo';
import {
	Editor,
	Brush as BrushTool,
	Eraser as EraserTool,
	Fill as FillTool,
	loadImage,
} from '@sgty/pixil';

import { Graphics } from 'pixi.js';
import Color from 'color';
import BrushExample from './examples/BrushExample';
import EraserExample from './examples/EraserExample';
import FillExample from './examples/FillExample';
import OverlayExample from './examples/OverlayExample';
import LayersExample from './examples/LayersExample';
import ExportExample from './examples/ExportExample';

export default {
	title: 'Examples',
	component: BaseEditorDemo,
} as ComponentMeta<typeof BaseEditorDemo>;

const Template: ComponentStory<typeof BaseEditorDemo> = (args) => (
	<BaseEditorDemo {...args} />
);

export const Brush = Template.bind({});
Brush.args = {
	id: 'Brush',
	Component: BrushExample,
};

export const Eraser = Template.bind({});
Eraser.args = {
	id: 'Eraser',
	Component: EraserExample,
};

export const Fill = Template.bind({});
Fill.args = {
	id: 'Fill',
	Component: FillExample,
};

export const Overlay = Template.bind({});
Overlay.args = {
	id: 'Overlay',
	Component: OverlayExample,
};

export const Layers = Template.bind({});
Layers.args = {
	id: 'Layers',
	Component: LayersExample,
};

export const Export = Template.bind({});
Export.args = {
	id: 'Export',
	Component: ExportExample,
};
