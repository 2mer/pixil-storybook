import { Button } from '@mantine/core';
import { Editor, Fill } from '@sgty/pixil';
import { useEffect } from 'react';

const ExportExample = ({ editor }: { editor: Editor }) => {
	useEffect(() => {
		editor.addTool(new Fill(editor, { buttons: [0] }));
	}, []);

	return (
		<Button
			onClick={() => {
				const imgUrl =
					editor.focusedLayer.canvas.toDataURL('image/png');

				var a = document.createElement('a');
				a.href = imgUrl;
				a.download = 'output.png';
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
			}}
		>
			export
		</Button>
	);
};

export default ExportExample;
