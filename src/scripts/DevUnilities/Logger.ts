export class Logger {
	private static _isLogEnabled: boolean = true;

	public static write(message: string, level: number = 0): void {
		if (!Logger._isLogEnabled) return;

		const formattedmessage = `${message}`;

		if (level >= 0 && level <= 9) {
			console.log(formattedmessage);
		} else if (level >= 10 && level <= 19) {
			console.warn(formattedmessage);
		} else if (level >= 20 && level <= 30) {
			console.error(formattedmessage);
		} else {
			console.log(formattedmessage);
		}
	}

	private static getStackDepth(): number {
		const stack = new Error().stack || "";
		return stack.split("\n").length - 2;
	}
}
