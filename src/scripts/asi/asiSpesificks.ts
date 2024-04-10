import { ECAMERA_SCENE_NAME } from "../CameraManagiment/CameraScenes";
import AEnumClass from "../utils/AEnumClass";
import { EasiContextes, EPageTypes } from "./context";

class EROLE extends AEnumClass {
	// this one
	public readonly this = "ROLE";
	// its variations
	public readonly CAMERA_CRANE = "CAMERA_CRANE";
	public readonly CRANED_CAMERA = "CRANED_CAMERA";
}
class ESUBROLE extends AEnumClass {
	// this one
	public readonly this = "SUBROLE";
	// its variations
	public readonly MAIN_CAMERA_CRANE = "MAIN_CAMERA_CRANE";
	public readonly MAIN_CRANED_CAMERA = "MAIN_CRANED_CAMERA";
}

/**
 * statically defines names for user params that i assing in blender
 */
export class EGLTF_PARAMS extends AEnumClass {
	public readonly this = "GLTFUserData";
	public static readonly ROLE = new EROLE();
	public static readonly SUBROLE = new ESUBROLE();
	public static readonly CAMERA_SCENE_NAME = new ECAMERA_SCENE_NAME();
}

export default class asiSpecificks {
	public static readonly Contextes = new EasiContextes();
	public static readonly PageTypes = new EPageTypes();
}
