import type { LazyArg } from "fp-ts/lib/function";

/**
 *
 */
export class Lazy<T> {
	private _value!: T;
	private _factory: () => T;

	constructor(factory: () => T) {
		this._factory = factory;
	}

	public get value(): T {
		return (this._value ??= this._factory());
	}
}

/**
 * 
 */
export class LazyB {
	static new = <T>(factory: () => T) => new Lazy(factory);
	static from = <T>(value: T) => new Lazy(() => value);

	static newAsLazyArg = <T>(factory: () => T): LazyArg<T> => {
		return () => LazyB.new(factory).value;
	};
	static fromAsLazyArg = <T>(value: T): LazyArg<T> => {
		return () => LazyB.from(value).value;
	};
}
