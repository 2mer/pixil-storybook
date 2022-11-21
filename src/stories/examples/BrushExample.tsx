import { Card, ColorPicker, Divider, Slider, Stack, Text } from '@mantine/core';
import { Brush, Editor } from '@sgty/pixil';
import { useEffect, useMemo } from 'react';
import Color from 'color';

const BrushExample = ({ editor }: { editor: Editor }) => {
	const brush = useMemo(() => new Brush(editor, { buttons: [0] }), []);

	useEffect(() => {
		editor.addTool(brush);
	}, []);

	return (
		<Stack>
			<Text>Color</Text>
			<ColorPicker
				format='rgba'
				onChange={(v) => (brush.color = Color(v))}
				defaultValue={'rgba(0,0,0,1)'}
			/>
			<Card.Section>
				<Divider />
			</Card.Section>
			<Text>Size</Text>
			<Slider
				min={1}
				max={25}
				step={1}
				defaultValue={4}
				onChange={(v) => (brush.size = v)}
			/>
		</Stack>
	);
};

export default BrushExample;
