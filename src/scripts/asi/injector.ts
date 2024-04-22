import { Container } from "inversify";
import "reflect-metadata";
import { CurrentSceneFromDOMDetector } from "../VueTSHelpers/CurrentSceneFromDOMDetector.ts";

export default class InjectionContainerBuilderH {
	private constructor() {}
	public static build() {
		const container = new Container();
		container
			.bind<CurrentSceneFromDOMDetector>("CurrentSceneFromDOMDetector")
			.to(CurrentSceneFromDOMDetector);

		return container;
	}
}
