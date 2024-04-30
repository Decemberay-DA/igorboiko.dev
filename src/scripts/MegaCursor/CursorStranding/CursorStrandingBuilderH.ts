import { ACursorStrandingB, CS, type IACursorStranding } from ".";

export class CursorStrandingBuilderH {
	public static getPlatformDependend() {
		var isTouchScreen = "ontouchstart" in document.documentElement;

		if (isTouchScreen) {
			// const stranding = new TouchScreenCursorStranding();
			return ACursorStrandingB.newMouseCursorStranding();
		} else {
			return ACursorStrandingB.newMouseCursorStranding();
		}
	}
}
