/**
 *
 */
export class Lazy<T> {
	private _value!: T;
	private _computed = false;
	private _factory: () => T;

	constructor(factory: () => T) {
		this._factory = factory;
	}

	public get value(): T {
		if (!this._computed) {
			this._computed = true;
			this._value = this._factory();
		}
		return this._value;
	}
}

/**
 *
 */
export class LazyB {
	static new = <T>(factory: () => T) => new Lazy(factory);
}
