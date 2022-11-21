import { Card, Code, Divider, Slider, Stack, Text } from '@mantine/core';
import { Editor, Eraser } from '@sgty/pixil';
import { useEffect, useMemo } from 'react';

const EraserExample = ({ editor }: { editor: Editor }) => {
	const eraser = useMemo(() => new Eraser(editor, { buttons: [0] }), []);

	useEffect(() => {
		editor.addTool(eraser);
	}, []);

	return (
		<Stack>
			<Text>Size</Text>
			<Slider
				min={1}
				max={25}
				step={1}
				defaultValue={4}
				onChange={(v) => (eraser.size = v)}
			/>
			<Card.Section>
				<Divider />
			</Card.Section>
			<Text>Trivia</Text>
			<Text>
				<Code>Eraser</Code> is an extension of the <Code>Brush</Code>{' '}
				class
			</Text>
		</Stack>
	);
};

export default EraserExample;
