import { ACursorStrandingB, CS, type IACursorStranding } from ".";

export class CursorStrandingBuilderH {
	public static getPlatformDependend() {
		return ACursorStrandingB.newMouseCursorStranding();

		// var isTouchScreen = "ontouchstart" in document.documentElement;
		// if (isTouchScreen) {
		// 	// const stranding = new TouchScreenCursorStranding();
		// 	return ACursorStrandingB.newMouseCursorStranding();
		// } else {
		// 	return ACursorStrandingB.newMouseCursorStranding();
		// }
	}
}
