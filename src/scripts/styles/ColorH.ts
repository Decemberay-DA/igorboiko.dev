import type RGB from "../utils/RGB";

export default class ColorH {
	public static hexToRgb(hex: string): RGB | null {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result
			? {
					r: parseInt(result[1], 16) / 255,
					g: parseInt(result[2], 16) / 255,
					b: parseInt(result[3], 16) / 255,
			  }
			: null;
	}

	public static RGBToCSSRGBAString(color: RGB) {
		const r = Math.round(color.r * 255);
		const g = Math.round(color.g * 255);
		const b = Math.round(color.b * 255);
		return `rgba(${r}, ${g}, ${b}, ${1})`;
	}
}
