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
	static readonly deep = <A>(obj: A): A => {
		if (obj === null || typeof obj !== "object") return obj;
		if (Array.isArray(obj)) return obj.map((item) => CloneH.deep(item)) as unknown as A;
		const deepClone = {} as A;
		for (const key in obj) {
			if (obj.hasOwnProperty(key)) {
				(deepClone as any)[key] = CloneH.deep((obj as any)[key]);
			}
		}
		return deepClone;
	};
}
