import { ECAMERA_SCENE_NAME } from "../CameraManagiment/CameraScenes";
import type { IEnumClass } from "../utils/AEnumClass";

export class EROLE implements IEnumClass {
	public readonly this = "ROLE";

	public readonly CAMERA_CRANE: TEROLE = "CAMERA_CRANE";
	public readonly CRANED_CAMERA: TEROLE = "CRANED_CAMERA";
}
type TEROLE = "CAMERA_CRANE" | "CRANED_CAMERA";

export class ESUBROLE implements IEnumClass {
	public readonly this = "SUBROLE";

	public readonly MAIN_CAMERA_CRANE: TESUBROLE = "MAIN_CAMERA_CRANE";
	public readonly MAIN_CRANED_CAMERA: TESUBROLE = "MAIN_CRANED_CAMERA";
}
type TESUBROLE = "MAIN_CAMERA_CRANE" | "MAIN_CRANED_CAMERA";

/**
 * statically defines names for user params that i assing in blender
 */
export class EGLTF_PARAMS implements IEnumClass {
	public readonly this = "GLTF_PARAMS";

	public static readonly ROLE = new EROLE();
	public static readonly SUBROLE = new ESUBROLE();
	public static readonly CAMERA_SCENE_NAME = new ECAMERA_SCENE_NAME();
}

export class EPAGE_TYPES implements IEnumClass {
	public readonly this = "PAGE_TYPES";

	public readonly MAIN_PAGE: TEEPAGE_TYPES = "MAIN_PAGE";
	public readonly ERROR_404_PAGE: TEEPAGE_TYPES = "ERROR_404_PAGE";
}
type TEEPAGE_TYPES = "MAIN_PAGE" | "ERROR_404_PAGE";

/**
 * state of current app idk
 */
export class EasiContextes implements IEnumClass {
	public readonly this = "asiContexte";

	public readonly INTRO_CUTSCENE: TEasiContextes = "INTRO_CUTSCENE";
	public readonly USUAL_IDK: TEasiContextes = "USUAL_IDK";
	public readonly EXPANDED_SUBPAGE_VIEW: TEasiContextes = "EXPANDED_SUBPAGE_VIEW";
}
type TEasiContextes = "INTRO_CUTSCENE" | "USUAL_IDK" | "EXPANDED_SUBPAGE_VIEW";

export default class asiSpecificks {
	public static readonly Contextes = new EasiContextes();
	public static readonly PageTypes = new EPAGE_TYPES();
}
