import { pipe } from "fp-ts/lib/function";
import type { THREE } from "../ThreeJS/ThreeEngine/THREE";
import { ArgumentsH } from "../utils/ArgumentsH";

/**
 * duh
 */
export default class HTMLElementEX {
	public static isCursorOverlaps(
		cursorPosition: THREE.Vector2,
		element: HTMLElement,
		checkParams: {
			vertical: boolean;
			horizontal: boolean;
		} = { vertical: true, horizontal: true }
	): boolean {
		const rect = element.getBoundingClientRect();
		const isOmni = checkParams.horizontal === true && checkParams.vertical === true;

		if (isOmni) {
			return omni();
		} else if (checkParams.horizontal === true) {
			return horizontal();
		} else if (checkParams.vertical === true) {
			return vertical();
		} else {
			return false;
		}

		function omni() {
			return vertical() === true && horizontal() === true;
		}
		function vertical() {
			return cursorPosition.x >= rect.left && cursorPosition.x <= rect.right;
		}
		function horizontal() {
			return cursorPosition.y >= rect.top && cursorPosition.y <= rect.bottom;
		}
	}
}
