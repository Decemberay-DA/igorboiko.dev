import { requestHandler, type INotification, type INotificationHandler } from "mediatr-ts";
import AEnumClass from "../utils/AEnumClass";
import type { DOMContentFinallyWasLoadedOMG } from "./VueSpecificks";
import DOMSearcher from "./DOMSearcher";
import asi from "../asi/asi";
import { data } from "../asi/data";

export interface ISection {
	name: string;
	order: number;
	htmlElement: HTMLElement;
}
type TReadonlySection = Readonly<ISection>;

@requestHandler(Request)
export default class EDefinedSections
	extends AEnumClass
	implements INotificationHandler<DOMContentFinallyWasLoadedOMG>
{
	public curentSection!: TReadonlySection;

	public LAND_SECTION!: TReadonlySection;
	public ABOUT_ME_SECTION!: TReadonlySection;
	public PROJECTS_SECTION!: TReadonlySection;
	public EXPERIENCE_SECTION!: TReadonlySection;
	public EDUCATION_SECTION!: TReadonlySection;
	public COMMENT_SECTION!: TReadonlySection;
	public CONTACT_SECTION!: TReadonlySection;

	public get getAllSections(): TReadonlySection[] {
		const sections: TReadonlySection[] = [
			this.LAND_SECTION,
			this.ABOUT_ME_SECTION,
			this.PROJECTS_SECTION,
			this.EXPERIENCE_SECTION,
			this.EDUCATION_SECTION,
			this.COMMENT_SECTION,
			this.CONTACT_SECTION,
		];
		return sections;
	}

	handle(notification: DOMContentFinallyWasLoadedOMG): Promise<void> {
		this.LAND_SECTION = {
			name: "LAND_SECTION",
			order: 0,
			htmlElement: DOMSearcher.getHTMLElementByClassName("LAND_SECTION"),
		};
		this.ABOUT_ME_SECTION = {
			name: "ABOUT_ME_SECTION",
			order: 1,
			htmlElement: DOMSearcher.getHTMLElementByClassName("ABOUT_ME_SECTION"),
		};
		this.PROJECTS_SECTION = {
			name: "PROJECTS_SECTION",
			order: 2,
			htmlElement: DOMSearcher.getHTMLElementByClassName("PROJECTS_SECTION"),
		};
		this.EXPERIENCE_SECTION = {
			name: "EXPERIENCE_SECTION",
			order: 3,
			htmlElement: DOMSearcher.getHTMLElementByClassName("EXPERIENCE_SECTION"),
		};
		this.EDUCATION_SECTION = {
			name: "EDUCATION_SECTION",
			order: 4,
			htmlElement: DOMSearcher.getHTMLElementByClassName("EDUCATION_SECTION"),
		};
		this.COMMENT_SECTION = {
			name: "COMMENT_SECTION",
			order: 5,
			htmlElement: DOMSearcher.getHTMLElementByClassName("COMMENT_SECTION"),
		};
		this.CONTACT_SECTION = {
			name: "CONTACT_SECTION",
			order: 6,
			htmlElement: DOMSearcher.getHTMLElementByClassName("CONTACT_SECTION"),
		};

		return Promise.resolve();
	}
}

export class SectionWasChanged implements INotification {
	public readonly newSectionName: string;
	public constructor(newSectionName: string) {
		this.newSectionName = newSectionName;
	}
}

@requestHandler(Request)
class SetChangedSection implements INotificationHandler<SectionWasChanged> {
	handle(notification: SectionWasChanged): Promise<void> {
		const newSection = asi.data.DefinedSections.getAllSections.find(
			(sec) => sec.name === notification.newSectionName
		)!;
		asi.data.DefinedSections.curentSection = newSection;
		return Promise.resolve();
	}
}
