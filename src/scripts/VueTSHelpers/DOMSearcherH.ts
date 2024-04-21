import { option } from "fp-ts";

/**
 *
 */
export default class DOMSearcherH {
	public static getFirstHTMLElementByClassName(className: string): HTMLElement {
		const elements = document.getElementsByClassName(className);
		if (elements.length > 0) {
			return elements[0] as HTMLElement;
		} else {
			throw new Error("First element with className '" + className + "' not found");
		}
	}
	public static getElementById(id: string): HTMLElement {
		const element = document.getElementById(id);
		if (element) {
			return element;
		} else {
			throw new Error("Element with id '" + id + "' not found");
		}
	}
	public static maybeElementById(id: string): option.Option<HTMLElement> {
		return option.fromNullable(document.getElementById(id));
	}
}
