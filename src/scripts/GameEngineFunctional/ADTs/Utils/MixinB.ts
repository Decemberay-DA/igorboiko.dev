/**
 * @deprivated use adt style instead of mixing
 */
export class MixinB {
	static newWith =
		<A>(a: A) =>
		<B>(b: B): A & B => ({
			...a,
			...b,
		});
}
