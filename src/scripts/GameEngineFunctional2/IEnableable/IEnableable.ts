/**
 *
 */
export interface IEnableable {
	isEnabled: boolean;
}
export class IEnableableB {
	static readonly newEnabled = (): IEnableable => ({
		isEnabled: true,
	});
	static readonly newDisabled = (): IEnableable => ({
		isEnabled: false,
	});
	static readonly newFrom = (state: boolean): IEnableable => ({
		isEnabled: state,
	});
}

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
	static readonly copyStateFrom =
		<A extends IEnableable>(obj: A) =>
		(reference: A): A => {
			obj.isEnabled = reference.isEnabled;
			return obj;
		};
}

class EnableableImplementor implements IEnableable {
	private _isEnabled: boolean = true;
	public get isEnabled(): boolean {
		this.doStuffWhenGotEnabled();
		return this._isEnabled;
	}
	public set isEnabled(value: boolean) {
		this.doStuffWhenGotDisabled();
		this._isEnabled = value;
	}

	public constructor() {}

	private doStuffWhenGotEnabled() {
		console.log("doStuffWhenGotEnabled");
	}
	private doStuffWhenGotDisabled() {
		console.log("doStuffWhenGotDisabled");
	}
}

export const testEnableableEvents = () => {
	const thing = new EnableableImplementor();

	console.log("will be enabled");
	IEnableableH.enable(thing);
	console.log("will be disabled");
	IEnableableH.disable(thing);

	console.log("will be toggled 1");
	IEnableableH.toggle(thing);
	console.log("will be toggled 2");
	IEnableableH.toggle(thing);
};
