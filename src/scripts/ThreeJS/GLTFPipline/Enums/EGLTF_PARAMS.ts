import type { IEnumClass } from "../../../utils/AEnumClass";
import EROLE from "./EROLE";
import ESUBROLE from "./ESUBROLE";

/**
 * statically defines names for user params that i assing in blender
 */

export default class EGLTF_PARAMS implements IEnumClass {
	public readonly selfName = "GLTF_PARAMS";

	public static readonly ROLE = new EROLE();
	public static readonly SUBROLE = new ESUBROLE();
}
