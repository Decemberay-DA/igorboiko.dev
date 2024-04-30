/**
 * bro piper
 * @purity sideffected
 */
export class Bro {
	private static _logThisOnePLZCount = 0;
	static readonly logThisOnePLZ = <Bro>(broski: Bro): Bro => {
		console.log("--- logged '" + typeof broski + "' number " + Bro._logThisOnePLZCount + ":");
		console.log(broski);
		return broski;
	};

	private static _logThisTextPLZCount = 0;
	static readonly logThisTextPLZ =
		<Bro>(meaningfullText: string) =>
		(broski: Bro): Bro => {
			console.log("| logged '" + Bro._logThisTextPLZCount + ": " + meaningfullText);
			return broski;
		};

	static readonly meanwhile =
		<Bro>(actually: (broski: Bro) => void) =>
		(broski: Bro): Bro => {
			actually(broski);
			return broski;
		};
}
