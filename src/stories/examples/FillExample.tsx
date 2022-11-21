import { Card, ColorPicker, Divider, Slider, Stack, Text } from '@mantine/core';
import { Editor, Fill } from '@sgty/pixil';
import { useEffect, useMemo } from 'react';
import Color from 'color';

const FillExample = ({ editor }: { editor: Editor }) => {
	const fill = useMemo(() => new Fill(editor, { buttons: [0] }), []);

	useEffect(() => {
		editor.addTool(fill);
	}, []);

	return (
		<Stack>
			<Text>Color</Text>
			<ColorPicker
				format='rgba'
				onChange={(v) => (fill.color = Color(v))}
				defaultValue={'rgba(0,0,0,1)'}
			/>
		</Stack>
	);
};

export default FillExample;
