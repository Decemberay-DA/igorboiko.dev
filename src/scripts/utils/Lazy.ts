export interface Factory<TResult> {
	(): TResult;
}


export class Lazy<T> {
	private factoryOutput: T | undefined;
	private isValueSet: boolean = false;
	private onFirstAccess: () => void;

	constructor(private factory: Factory<T>, onFirstAccess: () => void = () => {}) {
		this.onFirstAccess = onFirstAccess;
	}

	public get value(): T {
		if (!this.isValueSet) {
			this.factoryOutput = this.factory();
			this.isValueSet = true;
			this.onFirstAccess();
		}
		return this.factoryOutput as T;
	}
}
