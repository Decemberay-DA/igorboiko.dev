import { ACursorStranding } from "./ACursorStranding";
import { TouchScreenCursorStranding } from "./TouchScreenCursorStranding";
import { MouseCursorStranding } from "./MouseCursorStranding";

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
