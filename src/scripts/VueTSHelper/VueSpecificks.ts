import type { INotification } from "mediatr-ts";
import { asi } from "../asi/asi";
import { EDEFINED_LAYERS } from "./EDefinedLayers";
import type { THREE } from "../ThreeJS/THREE";

/**
 * duh
 */
export default class VueSpecificks {
	public static readonly DefinedComponents = new EDEFINED_LAYERS();

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
	public static findTopZIndexmostElement(elements: HTMLElement[]): HTMLElement {
		let topmostElement = elements[0];
		let maxZIndex = -Infinity;

		for (const element of elements) {
			const zIndex = parseFloat(window.getComputedStyle(element).zIndex);
			if (!Number.isNaN(zIndex) && zIndex > maxZIndex) {
				maxZIndex = zIndex;
				topmostElement = element;
			}
		}

		return topmostElement;
	}
}
