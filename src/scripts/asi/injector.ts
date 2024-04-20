import { Container } from "inversify";
import "reflect-metadata";
import { CurrentSceneFromDOMDetector } from "../VueTSHelper/CurrentSceneFromDOMDetector";

const container = new Container();
container.bind<CurrentSceneFromDOMDetector>("CurrentSectionDetector").to(CurrentSceneFromDOMDetector);

export { container as injector };
