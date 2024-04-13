import type { INotification } from "mediatr-ts";
import { asi } from "../asi/asi";
import { EDEFINED_LAYERS } from "./EDefinedLayers";
import type { THREE } from "../ThreeJS/THREE";

/**
 * duh
 */
export default class VueSpecificks {
	public static readonly DefinedComponents = new EDEFINED_LAYERS();

	public static isCursorOverlaps(cursorPosition: THREE.Vector2, element: HTMLElement): boolean {
		const rect = element.getBoundingClientRect();
		return (
			cursorPosition.x >= rect.left &&
			cursorPosition.x <= rect.right &&
			cursorPosition.y >= rect.top &&
			cursorPosition.y <= rect.bottom
		);
	}
	public static findTopZIndexmostElement(elements: HTMLElement[]): HTMLElement {
		let topmostElement = elements[0];
		let maxZIndex = -Infinity;

		for (let i = 0; i < elements.length; i++) {
			const element = elements[i];

			const zIndex = parseFloat(window.getComputedStyle(element).zIndex);
			if (!Number.isNaN(zIndex) && zIndex > maxZIndex) {
				maxZIndex = zIndex;
				topmostElement = element;
			}
		}

		return topmostElement;
	}
}
