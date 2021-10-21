export function findNode(id: string, parentDeepLayers: number) {
	const listNode: HTMLElement = document.getElementById(id);
	if (!listNode) {
		return;
	}

	let node: HTMLElement = listNode;
	for (let i = 0; i < parentDeepLayers; i++) {
		if (!node) {
			break;
		}

		node = node.parentElement;
	}

	return node;
}
