import { Card, Divider, Group, ScrollArea, Stack, Title } from '@mantine/core';
import {
	CheckerboardOverlay,
	ConstraintsSystem,
	loadImage,
	MovementSystem,
	OutlineOverlay,
} from '@sgty/pixil';
import React, { useRef } from 'react';
import HistoryList from '../HistoryList';
import useEditor from '../useEditor';
import useSWRImmutable from 'swr/immutable';
import axios from 'axios';
import { Prism } from '@mantine/prism';

export default function BaseEditorDemo({ Component, id }) {
	const [ref, editor] = useEditor({
		width: 192,
		height: 192,
		backgroundColor: 0xaeaeae,
	});

	const imageLoadedRef = useRef<Promise<any>>();

	const { data } = useSWRImmutable(['code', id], () =>
		axios.get(
			`https://raw.githubusercontent.com/2mer/pixil-storybook/main/src/stories/examples/${id}Example.tsx`
		)
	);

	React.useEffect(() => {
		if (editor) {
			editor.history.enabled = true;
			editor.history.limit = 5;
			// setup interactions
			editor.viewport.drag({ mouseButtons: 'middle' }).wheel().pinch();
			// editor.viewport.drag().wheel().pinch()

			editor.addAddon(
				new CheckerboardOverlay({ c1: 0x797979, c2: 0xc3c3c3 })
			);
			editor.addAddon(new OutlineOverlay({ width: 1, color: 0x323232 }));

			// set canvas size to first image load
			imageLoadedRef.current = loadImage('logo192.png').then((image) => {
				editor.setCanvasSize(image.width, image.height);

				// draw the image onto the layer
				const imageLayer = editor.createLayer().drawImage(image);

				editor.setFocusedLayer(imageLayer);
			});

			const ms = new MovementSystem();
			ms.wasd().arrows().plusminus();
			editor.addAddon(ms);

			const cs = new ConstraintsSystem({ minZoom: 1, maxZoom: 10 });
			editor.addAddon(cs);

			console.log(editor);
		}
	}, [editor]);

	return (
		<Stack>
			<Group align='start'>
				<Card withBorder>
					<Stack>
						<div
							ref={ref}
							style={{
								width: '192px',
								height: '192px',
								display: 'flex',
							}}
						/>
						<Card.Section>
							<Divider />
						</Card.Section>
						<HistoryList editor={editor} />
					</Stack>
				</Card>
				<Card withBorder>
					{editor && (
						<Component
							editor={editor}
							imageLoadedRef={imageLoadedRef}
						/>
					)}
				</Card>
				<Stack>
					<Title order={1}>{id}</Title>
					<ScrollArea>
						{Boolean(data?.data) && (
							<Prism language='tsx' h='500px'>
								{data!.data}
							</Prism>
						)}
					</ScrollArea>
				</Stack>
			</Group>
		</Stack>
	);
}
