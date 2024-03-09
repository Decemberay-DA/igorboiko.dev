export class Logger {
    private static _isLogEnabled: boolean = true;

    public static write(message: string, level: number = 0): void {
        if (!Logger._isLogEnabled) return;

        const depth = this.getStackDepth();
        const indent = this.getIndent(depth);

        if (level >= 0 && level <= 9) {
            console.log(`${indent}${message}`);
        } else if (level >= 10 && level <= 19) {
            console.warn(`${indent}${message}`);
        } else if (level >= 20 && level <= 30) {
            console.error(`${indent}${message}`);
        } else {
            console.log(`${indent}${message}`);
        }
    }

    private static getIndent(depth: number): string {
        return " ".repeat(depth * 4);
    }
    private static getStackDepth(): number {
        const stack = new Error().stack || "";
        return stack.split("\n").length - 2;
    }
}
