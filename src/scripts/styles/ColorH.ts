import type { IRGB, IRGBA } from "../utils/IRGB";
import { option } from "fp-ts";

export type TColorEncodings =
	//
	| "RGB"
	// starts with "#"
	| "HEX";

export default class ColorH {
	public static detectTColorEncoding(colorString: string): TColorEncodings {
		if (colorString.startsWith("#")) {
			return "HEX";
		} else if (colorString.startsWith("rgba")) {
			return "RGB";
		} else {
			throw new Error("Invalid color encoding");
		}
	}

	public static CSSHEXString_to_IRGB(hex: string): option.Option<IRGB> {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result
			? option.some({
					r: parseInt(result[1], 16) / 255,
					g: parseInt(result[2], 16) / 255,
					b: parseInt(result[3], 16) / 255,
			  })
			: option.none;
	}

	/**
	 * @returns #0055ff like
	 */
	public static IRGB_to_CSSHEXString(rgb: IRGB): option.Option<string> {
		function toHex(value: number) {
			return Math.round(value * 255)
				.toString(16)
				.padStart(2, "0");
		}

		const rHex = toHex(rgb.r);
		const gHex = toHex(rgb.g);
		const bHex = toHex(rgb.b);

		return option.some(`#${rHex}${gHex}${bHex}`);
	}

	public static IRGB_to_CSSRGBAString(color: IRGB, alpha = 1) {
		const r = Math.round(color.r * 255);
		const g = Math.round(color.g * 255);
		const b = Math.round(color.b * 255);
		return `rgba(${r}, ${g}, ${b}, ${alpha})`;
	}

	/**
	 * @param rgbaCSSColor "rgba(0, 120, 255, 1)" like
	 */
	public static CSSRGBAString_to_IRGBA(rgbaCSSColor: string): option.Option<IRGBA> {
		const rgba = rgbaCSSColor.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([01]?(?:\.\d+)?)\)/);
		return rgba
			? option.some({
					r: parseInt(rgba[1]) / 255,
					g: parseInt(rgba[2]) / 255,
					b: parseInt(rgba[3]) / 255,
					a: parseInt(rgba[4]),
			  })
			: option.none;
	}
}
