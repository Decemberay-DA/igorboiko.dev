import { ECAMERA_SCENE_NAME___ } from "../../../CameraManagiment/CameraScenes___";
import type { IEnumClass } from "../../../utils/AEnumClass";
import EROLE from "./EROLE";
import ESUBROLE from "./ESUBROLE";

/**
 * statically defines names for user params that i assing in blender
 */

export default class EGLTF_PARAMS implements IEnumClass {
	public readonly this = "GLTF_PARAMS";

	public static readonly ROLE = new EROLE();
	public static readonly SUBROLE = new ESUBROLE();
	public static readonly CAMERA_SCENE_NAME = new ECAMERA_SCENE_NAME___();
}
