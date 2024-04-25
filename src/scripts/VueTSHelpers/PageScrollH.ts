import { TWEEN } from "../FrameworksExport";

/**
 *
 */
export default class PageScrollH {
	public static newTweenScrollToPoint(point: { x: number; y: number }) {
		const coords = { y: window.scrollY };
		new TWEEN.Tween(coords)
			.to({ y: point.y }, 1023)
			.easing(TWEEN.Easing.Quadratic.Out)
			.onUpdate(() => window.scrollTo(point.x, coords.y))
			.start(); // convert to GE.Coroutine
	}

	public static scrollToHTMLElement(htmlElement: HTMLElement) {
		PageScrollH.newTweenScrollToPoint({
			x: 0,
			y: window.scrollY + htmlElement.getBoundingClientRect().top,
		});
	}
}
