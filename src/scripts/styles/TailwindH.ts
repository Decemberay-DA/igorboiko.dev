import { option } from "fp-ts";
import { pipe } from "fp-ts/lib/function";
import ColorH from "./ColorH";
import CSSH from "./CSSSH";
import type { IRGB } from "../utils/IRGB";

/**
 *
 */
export default class TailwindH {
	/**
	 * @param twColorTokenName from @see TailwindMirrorH
	 */
	public static readonly getColorToken = (twColorTokenName: string): IRGB =>
		pipe(
			twColorTokenName,
			TailwindH.TWVariableName_To_CSSVariableName,
			CSSH.getCssVariableValueAsString,
			option.match(
				() => ColorH.IRGB_to_CSSRGBAString({ r: 1, g: 0, b: 0 }),
				(some) => some
			),
			ColorH.CSSRGBAString_to_IRGBA,
			option.match(
				() => ({ r: 0, g: 1, b: 0 }),
				(some) => some
			)
		);

	public static readonly TWVariableName_To_CSSVariableName = (tailwingVariableName: string): string =>
		`--tw-${tailwingVariableName}`;

	public static readonly CSSVariableName_To_TWVariableName = (cssVariableName: string): string =>
		cssVariableName.startsWith("--tw-") ? cssVariableName.substring(5) : cssVariableName;
}
