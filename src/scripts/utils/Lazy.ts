/**
 *
 */
export class Lazy<T> {
	private _value!: T;
	private _computed: boolean = false;
	private _factory: () => T;

	constructor(factory: () => T) {
		this._factory = factory;
	}

	public get value(): T {
		if (!this._computed) {
			this._value = this._factory();
			this._computed = true;
		}
		return this._value;
	}
}

/**
 *
 */
export class LazyH {
	static new = <T>(factory: () => T) => new Lazy(factory);
}
