import { ECAMERA_SCENE_NAME } from "../CameraManagiment/CameraScenes";
import type { IEnumClass } from "../utils/AEnumClass";

export class EROLE implements IEnumClass {
	public readonly this = "ROLE";

	public readonly CAMERA_CRANE = "CAMERA_CRANE";
	public readonly CRANED_CAMERA = "CRANED_CAMERA";
}
export class ESUBROLE implements IEnumClass {
	public readonly this = "SUBROLE";

	public readonly MAIN_CAMERA_CRANE = "MAIN_CAMERA_CRANE";
	public readonly MAIN_CRANED_CAMERA = "MAIN_CRANED_CAMERA";
}

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

	public readonly MAIN_PAGE = "MAIN_PAGE";
	public readonly ERROR_404_PAGE = "ERROR_404_PAGE";
}

export class EasiContextes implements IEnumClass {
	public readonly this = "asiContexte";

	public readonly USUAL_IDK = "USUAL_IDK";
	public readonly INTRO_CUTSCENE = "INTRO_CUTSCENE";
	public readonly EXPANDED_SUBPAGE_VIEW = "EXPANDED_SUBPAGE_VIEW";
}

export default class asiSpecificks {
	public static readonly Contextes = new EasiContextes();
	public static readonly PageTypes = new EPAGE_TYPES();
}
