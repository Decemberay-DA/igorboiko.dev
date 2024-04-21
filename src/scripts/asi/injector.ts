import { Container } from "inversify";
import "reflect-metadata";
import { CurrentSceneFromDOMDetector } from "../VueTSHelpers/CurrentSceneFromDOMDetector";

export default class InjectionContainerBuilderH {
	private constructor() {}
	public static build() {
		const container = new Container();
		container.bind<CurrentSceneFromDOMDetector>("CurrentSectionDetector").to(CurrentSceneFromDOMDetector);

		return container;
	}
}
