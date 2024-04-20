import type { IEnumClass } from "../utils/AEnumClass";
import DOMSearcherH from "./DOMSearcherH";
import EGLTF_PARAMS from "../ThreeJS/GLTFPipline/Enums/EGLTF_PARAMS";
import { Lazy } from "../utils/Lazy";

/**
 * @deprecated use SceneRegistry
 */
export interface ISection {
	name: string;
	htmlElement: HTMLElement;
}
/**
 * @deprecated use SceneRegistry
 */
type TReadonlySection = Readonly<ISection>;
/**
 * @deprecated use SceneRegistry
 */

/**
 * why? whywhywhwyhwywh to use some complex data registry system if o could just every time search all COMthree for html element and game scene for camera
 * @deprecated
 */
export default class EDefinedSections implements IEnumClass {
	public readonly this = "DefinedSections";

	public curentSection!: TReadonlySection;

	// public safely acessed lazy hidden things ========-====-====-====-============
	public get INTRO_SECTION(): TReadonlySection {
		return this._INTRO_SECTION.value;
	}

	public get LAND_SECTION(): TReadonlySection {
		return this._LAND_SECTION.value;
	}
	public get ABOUT_SECTION(): TReadonlySection {
		return this._ABOUT_SECTION.value;
	}
	public get PROJECTS_SECTION(): TReadonlySection {
		return this._PROJECTS_SECTION.value;
	}
	public get EXPERIENCE_SECTION(): TReadonlySection {
		return this._EXPERIENCE_SECTION.value;
	}
	public get EDUCATION_SECTION(): TReadonlySection {
		return this._EDUCATION_SECTION.value;
	}
	public get COMMENT_SECTION(): TReadonlySection {
		return this._COMMENT_SECTION.value;
	}
	public get CONTACT_SECTION(): TReadonlySection {
		return this._CONTACT_SECTION.value;
	}

	public get ERROR_404_PAGE(): TReadonlySection {
		return this._ERROR_404_PAGE.value;
	}

	public get getAllSections(): TReadonlySection[] {
		const sections: TReadonlySection[] = [
			this.INTRO_SECTION,
			this.LAND_SECTION,
			this.ABOUT_SECTION,
			this.PROJECTS_SECTION,
			this.EXPERIENCE_SECTION,
			this.EDUCATION_SECTION,
			this.COMMENT_SECTION,
			this.CONTACT_SECTION,
			this.ERROR_404_PAGE,
		];
		return sections;
	}

	public findSectionByName(name: string): TReadonlySection {
		const x = this.getAllSections.find((s) => s.name === name);
		if (x) {
			return x;
		} else {
			throw new Error("section with name '" + name + "' not found");
		}
	}

	// private lazy things cz statick fields are getting initialized before html dom ========-====-====-====-============
	private _INTRO_SECTION: Lazy<TReadonlySection> = new Lazy<TReadonlySection>(() => {
		return {
			name: EGLTF_PARAMS.CAMERA_SCENE_NAME.INTRO_SECTION,
			htmlElement: DOMSearcherH.getElementById(EGLTF_PARAMS.CAMERA_SCENE_NAME.INTRO_SECTION),
		};
	});
	private _LAND_SECTION: Lazy<TReadonlySection> = new Lazy<TReadonlySection>(() => {
		return {
			name: EGLTF_PARAMS.CAMERA_SCENE_NAME.LAND_SECTION,
			htmlElement: DOMSearcherH.getElementById(EGLTF_PARAMS.CAMERA_SCENE_NAME.LAND_SECTION),
		};
	});
	private _ABOUT_SECTION: Lazy<TReadonlySection> = new Lazy<TReadonlySection>(() => {
		return {
			name: EGLTF_PARAMS.CAMERA_SCENE_NAME.ABOUT_SECTION,
			htmlElement: DOMSearcherH.getElementById(EGLTF_PARAMS.CAMERA_SCENE_NAME.ABOUT_SECTION),
		};
	});
	private _PROJECTS_SECTION: Lazy<TReadonlySection> = new Lazy<TReadonlySection>(() => {
		return {
			name: EGLTF_PARAMS.CAMERA_SCENE_NAME.PROJECTS_SECTION,
			htmlElement: DOMSearcherH.getElementById(EGLTF_PARAMS.CAMERA_SCENE_NAME.PROJECTS_SECTION),
		};
	});
	private _EXPERIENCE_SECTION: Lazy<TReadonlySection> = new Lazy<TReadonlySection>(() => {
		return {
			name: EGLTF_PARAMS.CAMERA_SCENE_NAME.EXPERIENCE_SECTION,
			htmlElement: DOMSearcherH.getElementById(EGLTF_PARAMS.CAMERA_SCENE_NAME.EXPERIENCE_SECTION),
		};
	});
	private _EDUCATION_SECTION: Lazy<TReadonlySection> = new Lazy<TReadonlySection>(() => {
		return {
			name: EGLTF_PARAMS.CAMERA_SCENE_NAME.EDUCATION_SECTION,
			htmlElement: DOMSearcherH.getElementById(EGLTF_PARAMS.CAMERA_SCENE_NAME.EDUCATION_SECTION),
		};
	});
	private _COMMENT_SECTION: Lazy<TReadonlySection> = new Lazy<TReadonlySection>(() => {
		return {
			name: EGLTF_PARAMS.CAMERA_SCENE_NAME.COMMENT_SECTION,
			htmlElement: DOMSearcherH.getElementById(EGLTF_PARAMS.CAMERA_SCENE_NAME.COMMENT_SECTION),
		};
	});
	private _CONTACT_SECTION: Lazy<TReadonlySection> = new Lazy<TReadonlySection>(() => {
		return {
			name: EGLTF_PARAMS.CAMERA_SCENE_NAME.CONTACT_SECTION,
			htmlElement: DOMSearcherH.getElementById(EGLTF_PARAMS.CAMERA_SCENE_NAME.CONTACT_SECTION),
		};
	});
	private _ERROR_404_PAGE: Lazy<TReadonlySection> = new Lazy<TReadonlySection>(() => {
		return {
			name: EGLTF_PARAMS.CAMERA_SCENE_NAME.ERROR_404_PAGE,
			htmlElement: DOMSearcherH.getElementById(EGLTF_PARAMS.CAMERA_SCENE_NAME.ERROR_404_PAGE),
		};
	});
}
