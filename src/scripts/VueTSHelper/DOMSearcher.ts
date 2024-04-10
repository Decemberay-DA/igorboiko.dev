export default class DOMSearcher {
	public static getDomElementsByIDSelector(className: string): Element[] {
		const nodeList = document.querySelectorAll(`#${className}`);
		const array = Array.from(nodeList);
		return array;
	}
	public static getHTMLElementByClassName(className: string): HTMLElement {
		const elements = document.getElementsByClassName(className);
		return elements.length > 0 ? (elements[0] as HTMLElement) : null!;
	}
}
