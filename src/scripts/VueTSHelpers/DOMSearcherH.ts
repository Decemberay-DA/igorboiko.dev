import { array, option } from "fp-ts";
import { pipe } from "fp-ts/lib/function";

/**
 *
 */
export default class DOMSearcherH {
	public static getFirstHTMLElementByClassName = (className: string): HTMLElement => {
		const elements = document.getElementsByClassName(className);
		if (elements.length > 0) {
			return elements[0] as HTMLElement;
		} else {
			throw new Error("First element with className '" + className + "' not found");
		}
	};
	/**
	 * @deprecated ues DOMSearcherH.maybeElementById
	 */
	public static getElementById = (id: string): HTMLElement => {
		const element = document.getElementById(id);
		if (element) {
			return element;
		} else {
			throw new Error("Element with id '" + id + "' not found");
		}
	};
	public static maybeElementById = (id: string): option.Option<HTMLElement> =>
		pipe(
			document.getElementById(id), //
			option.fromNullable
		);
}
