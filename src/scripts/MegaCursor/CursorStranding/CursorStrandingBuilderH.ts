import type { ACursorStranding } from "./ACursorStranding";
import { MouseCursorStranding } from "./MouseCursorStranding";
import { TouchScreenCursorStranding } from "./TouchScreenCursorStranding";

export class CursorStrandingBuilderH {
	public static getPlatformDependend(): ACursorStranding {
		var isTouchScreen = "ontouchstart" in document.documentElement;

		if (isTouchScreen) {
			const stranding = new TouchScreenCursorStranding();
			return stranding;
		} else {
			const stranding = new MouseCursorStranding();
			return stranding;
		}
	}
}
