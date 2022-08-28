import { useState } from "react";

export function useContextMenu() {
	const [point, setPoint] = useState({ x: 0, y: 0 });
	const [isContextMenu, setIsContextMenu] = useState(false);

	const closeMenu = () => {
		setIsContextMenu(false);

		window.removeEventListener("contextmenu", closeMenu);
		window.removeEventListener("click", closeMenu);
		window.removeEventListener("keyup", e => {
			onESC(e);
		});
	};

	const onESC = e => {
		if (e.key === "Escape") {
			closeMenu();
		}
	};

	const onContextMenuHandler = e => {
		e.preventDefault();
		setPoint({ x: e.pageX, y: e.pageY });
		console.log([e.pageX, e.pageY]);
		if (!isContextMenu) {
			setIsContextMenu(true);

			window.addEventListener("click", closeMenu);
			window.addEventListener("keyup", e => {
				onESC(e);
			});
			setTimeout(() => {
				window.addEventListener("contextmenu", closeMenu);
			}, 0);
		}
	};

	const style = { position: "fixed", top: point.y, left: point.x };
	return [isContextMenu, { style }, onContextMenuHandler];
}
