/**
 * C# looooololollollolooloolol ({...thingLOLOOLOLLO})
 * @deprecated
 */
export interface IClonable<T> {
	clone(): T;
}

/**
 *
 */
export class CloneH {
	static readonly shallow = <A>(obj: A): A => ({ ...obj });
	static readonly deep = <A>(obj: A): A => CloneH.shallow(obj);
}
