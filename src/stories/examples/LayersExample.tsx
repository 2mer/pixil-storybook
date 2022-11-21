import { SegmentedControl, Stack } from '@mantine/core';
import { Brush, Editor } from '@sgty/pixil';
import Color from 'color';
import { RefObject, useEffect } from 'react';

const LayersExample = ({
	editor,
	imageLoadedRef,
}: {
	editor: Editor;
	imageLoadedRef: RefObject<Promise<any>>;
}) => {
	useEffect(() => {
		if (imageLoadedRef.current) {
			imageLoadedRef.current.then(() => {
				editor.createLayer();
				editor.createLayer();
			});
		}

		class RainbowBrush extends Brush {
			getColor() {
				const c = Color.hsv(
					((Date.now() % 10_000) / 10_000) * 360,
					100,
					50
				);

				return c;
			}
		}

		editor.addTool(new RainbowBrush(editor, { buttons: [0] }));
	}, []);

	return (
		<Stack>
			<SegmentedControl
				orientation='vertical'
				data={[
					{ value: '0', label: 'Layer#1' },
					{ value: '1', label: 'Layer#2' },
					{ value: '2', label: 'Layer#3' },
				]}
				onChange={(v) => editor.setFocusedLayer(editor.layers[+v])}
			/>
		</Stack>
	);
};

export default LayersExample;
