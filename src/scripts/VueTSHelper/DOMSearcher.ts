/**
 *
 */
export default class DOMSearcher {
	/**
	 * @deprecated use DOMSearcher.getElementById
	 */
	public static getDomElementsByIDSelector(className: string): Element[] {
		const nodeList = document.querySelectorAll(`#${className}`);
		const array = Array.from(nodeList);
		return array;
	}
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
	public static maybeElementById(id: string): HTMLElement | null {
		return document.getElementById(id);
	}
}
