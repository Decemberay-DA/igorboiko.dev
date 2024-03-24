import type {
	RouteLocationNormalized,
	RouteLocationNormalizedLoaded,
	RouterScrollBehavior,
} from "vue-router";

export default class ScrollBehaviour {
	private constructor() {}

	public static readonly behaviour: RouterScrollBehavior = (
		to: RouteLocationNormalized,
		from: RouteLocationNormalizedLoaded,
		savedPosition: any
	) => {
		if (savedPosition) return savedPosition;
		else return { x: 0, y: 0 };
	};
}
