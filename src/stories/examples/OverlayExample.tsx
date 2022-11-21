import { Code, Stack, Text } from '@mantine/core';
import { Editor } from '@sgty/pixil';
import { Graphics, Sprite } from 'pixi.js';
import { useEffect } from 'react';

const OverlayExample = ({ editor }: { editor: Editor }) => {
	useEffect(() => {
		// taken mostly from https://pixijs.io/examples/#/sprite/basic.js
		const createBunny = () => {
			// create a new Sprite from an image path
			const bunny = Sprite.from('bunny.png');

			// center the sprite's anchor point
			bunny.anchor.set(0.5);

			// move the sprite to the center of the screen
			bunny.x = editor.app.screen.width / 2;
			bunny.y = editor.app.screen.height / 2;

			bunny.scale.set(2);

			// Listen for animate update
			editor.app.ticker.add((delta) => {
				// just for fun, let's rotate mr rabbit a little
				// delta is 1 if running at 100% performance
				// creates frame-independent transformation
				bunny.rotation += 0.1 * delta;
			});

			return bunny;
		};

		const relativeBunny = createBunny();
		const absoluteBunny = createBunny();

		editor.viewport.addChild(relativeBunny);
		editor.app.stage.addChild(absoluteBunny);
	}, []);

	return (
		<Stack>
			<Text w='200px'>
				Use the <Code>editor.app</Code> or <Code>editor.viewport</Code>{' '}
				to append your PIXI.js display objects
			</Text>
		</Stack>
	);
};

export default OverlayExample;
