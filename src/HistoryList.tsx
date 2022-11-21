import {
	Button,
	Group,
	Kbd,
	Stack,
	Table,
	Text,
	Title,
	Tooltip,
} from '@mantine/core';
import { Editor, Layer } from '@sgty/pixil';
import { useHotkeys, useOs } from '@mantine/hooks';
import React, { useCallback } from 'react';

export default function HistoryList({
	editor = undefined as Editor | undefined,
}) {
	const [historyEntries, setHistoryEntries] = React.useState([] as any[]);
	const [historyIndex, setHistoryIndex] = React.useState(0);

	const undo = useCallback(() => {
		if (editor) {
			editor.history.undo();
		}
	}, [editor]);

	const redo = useCallback(() => {
		if (editor) {
			editor.history.redo();
		}
	}, [editor]);

	useHotkeys([
		['mod+z', undo],
		['mod+shift+z', redo],
	]);

	const os = useOs();

	React.useEffect(() => {
		if (editor) {
			return editor.history.onHistoryChanged.sub(({ history }) => {
				setHistoryEntries([...history.entries]);
				setHistoryIndex(history.index);
			});
		}
	}, [editor]);

	if (!editor) return null;

	return (
		<Stack>
			<Title order={2}>History</Title>
			<Table>
				<thead>
					<tr>
						<th>#</th>
						<th>target</th>
						<th>identifier</th>
					</tr>
				</thead>
				<tbody>
					{historyEntries.map((entry, index) => {
						const isSelected = index === historyIndex;
						const isUndone = historyIndex < index;

						return (
							<tr
								key={index}
								style={{
									fontWeight: isSelected ? 'bold' : undefined,
									opacity: isUndone ? 0.5 : undefined,
								}}
							>
								<td>{index}</td>
								<td>{(entry.target as Layer).name}</td>
								<td>{entry.identifier}</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
			<Group noWrap>
				<Tooltip
					label={
						<Text>
							<Kbd>{os === 'macos' ? '⌘' : 'ctrl'}</Kbd> +
							<Kbd>Z</Kbd>
						</Text>
					}
				>
					<Button fullWidth onClick={undo}>
						undo
					</Button>
				</Tooltip>
				<Tooltip
					label={
						<Text>
							<Kbd>{os === 'macos' ? '⌘' : 'ctrl'}</Kbd> +
							<Kbd>Shift</Kbd> +<Kbd>Z</Kbd>
						</Text>
					}
				>
					<Button fullWidth onClick={redo}>
						redo
					</Button>
				</Tooltip>
			</Group>
		</Stack>
	);
}
