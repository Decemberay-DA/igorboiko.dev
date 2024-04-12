import { type INotification } from "mediatr-ts";
import type { IEnumClass } from "../utils/AEnumClass";
import DOMSearcher from "./DOMSearcher";
import { ASeflSeqrchedEnumeration } from "../utils/ASeflSeqrchedEnumeration";
import asiSpecificks, { EGLTF_PARAMS } from "../asi/asiSpesificks";

export interface ISection {
	name: string;
	order: number;
	htmlElement: HTMLElement;
}
type TReadonlySection = Readonly<ISection>;

export default class EDefinedSections extends ASeflSeqrchedEnumeration implements IEnumClass {
	public readonly this = "DefinedSections";

	public curentSection!: TReadonlySection;

	public INTRO_SECTION!: TReadonlySection;

	public LAND_SECTION!: TReadonlySection;
	public ABOUT_SECTION!: TReadonlySection;
	public PROJECTS_SECTION!: TReadonlySection;
	public EXPERIENCE_SECTION!: TReadonlySection;
	public EDUCATION_SECTION!: TReadonlySection;
	public COMMENT_SECTION!: TReadonlySection;
	public CONTACT_SECTION!: TReadonlySection;

	public ERROR_404_PAGE!: TReadonlySection;

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
		];
		return sections;
	}

	override onStart(): void {
		this.seqrchSections();
	}

	private seqrchSections() {
		this.INTRO_SECTION = {
			name: EGLTF_PARAMS.CAMERA_SCENE_NAME.INTRO_SECTION,
			order: 0,
			htmlElement: DOMSearcher.getFirstHTMLElementByClassName(
				EGLTF_PARAMS.CAMERA_SCENE_NAME.INTRO_SECTION
			),
		};
		this.LAND_SECTION = {
			name: EGLTF_PARAMS.CAMERA_SCENE_NAME.LAND_SECTION,
			order: 0,
			htmlElement: DOMSearcher.getFirstHTMLElementByClassName(
				EGLTF_PARAMS.CAMERA_SCENE_NAME.LAND_SECTION
			),
		};
		this.ABOUT_SECTION = {
			name: EGLTF_PARAMS.CAMERA_SCENE_NAME.ABOUT_SECTION,
			order: 1,
			htmlElement: DOMSearcher.getFirstHTMLElementByClassName(
				EGLTF_PARAMS.CAMERA_SCENE_NAME.ABOUT_SECTION
			),
		};
		this.PROJECTS_SECTION = {
			name: EGLTF_PARAMS.CAMERA_SCENE_NAME.PROJECTS_SECTION,
			order: 2,
			htmlElement: DOMSearcher.getFirstHTMLElementByClassName(
				EGLTF_PARAMS.CAMERA_SCENE_NAME.PROJECTS_SECTION
			),
		};
		this.EXPERIENCE_SECTION = {
			name: EGLTF_PARAMS.CAMERA_SCENE_NAME.EXPERIENCE_SECTION,
			order: 3,
			htmlElement: DOMSearcher.getFirstHTMLElementByClassName(
				EGLTF_PARAMS.CAMERA_SCENE_NAME.EXPERIENCE_SECTION
			),
		};
		this.EDUCATION_SECTION = {
			name: EGLTF_PARAMS.CAMERA_SCENE_NAME.EDUCATION_SECTION,
			order: 4,
			htmlElement: DOMSearcher.getFirstHTMLElementByClassName(
				EGLTF_PARAMS.CAMERA_SCENE_NAME.EDUCATION_SECTION
			),
		};
		this.COMMENT_SECTION = {
			name: EGLTF_PARAMS.CAMERA_SCENE_NAME.COMMENT_SECTION,
			order: 5,
			htmlElement: DOMSearcher.getFirstHTMLElementByClassName(
				EGLTF_PARAMS.CAMERA_SCENE_NAME.COMMENT_SECTION
			),
		};
		this.CONTACT_SECTION = {
			name: EGLTF_PARAMS.CAMERA_SCENE_NAME.CONTACT_SECTION,
			order: 6,
			htmlElement: DOMSearcher.getFirstHTMLElementByClassName(
				EGLTF_PARAMS.CAMERA_SCENE_NAME.CONTACT_SECTION
			),
		};
		this.ERROR_404_PAGE = {
			name: EGLTF_PARAMS.CAMERA_SCENE_NAME.ERROR_404_PAGE,
			order: 99,
			htmlElement: DOMSearcher.getFirstHTMLElementByClassName(
				EGLTF_PARAMS.CAMERA_SCENE_NAME.ERROR_404_PAGE
			),
		};
	}
}

// export class SectionWasChanged implements INotification {
// 	public readonly newSectionName: string;
// 	public constructor(newSectionName: string) {
// 		this.newSectionName = newSectionName;
// 	}
// }

// @requestHandler(SectionWasChanged)
// class SetChangedSection implements INotificationHandler<SectionWasChanged> {
// 	async handle(notification: SectionWasChanged): Promise<void> {
// 		const newSection = asi.data.DefinedSections.getAllSections.find(
// 			(sec) => sec.name === notification.newSectionName
// 		)!;
// 		asi.data.DefinedSections.curentSection = newSection;
// 		// return Promise.resolve();
// 	}
// }
