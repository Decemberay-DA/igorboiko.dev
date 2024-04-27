import type { IEnableable } from "./IEnableable";

/**
 *
 */
export class IEnableableB {
	static readonly fromValue = (state: boolean): IEnableable => ({
		isEnabled: state,
	});
	static readonly enabled = (): IEnableable => ({
		isEnabled: true,
	});
	static readonly disabled = (): IEnableable => ({
		isEnabled: false,
	});
	static readonly prototipe = (prototipe: IEnableable): IEnableable => ({
		isEnabled: prototipe.isEnabled,
	});
}
