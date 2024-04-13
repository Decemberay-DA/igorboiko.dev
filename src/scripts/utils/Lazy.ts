export interface Factory<TResult> {
	(): TResult;
}

export class Lazy<T> {
	private factoryOutput: T | undefined;
	private isValueSet: boolean = false;

	constructor(private factory: Factory<T>) {}

	public get value(): T {
		if (!this.isValueSet) {
			this.factoryOutput = this.factory();
			this.isValueSet = true;
		}
		return this.factoryOutput as T;
	}
}
