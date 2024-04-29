import type { IEnableable } from "./IEnableable";

/**
 *
 */
export class IEnableableH {
	static readonly enable = <A extends IEnableable>(obj: A): A => {
		obj.isEnabled = true;
		return obj;
	};
	static readonly disable = <A extends IEnableable>(obj: A): A => {
		obj.isEnabled = false;
		return obj;
	};
	static readonly toggle = <A extends IEnableable>(obj: A): A => {
		obj.isEnabled = !obj.isEnabled;
		return obj;
	};
	static readonly copyFrom =
		<A extends IEnableable>(obj: A) =>
		(reference: A): A => {
			obj.isEnabled = reference.isEnabled;
			return obj;
		};
	static readonly executeIfEnabled =
		<A extends IEnableable>(action: () => void) =>
		(obj: A): A => {
			if (obj.isEnabled) action();
			return obj;
		};
}
