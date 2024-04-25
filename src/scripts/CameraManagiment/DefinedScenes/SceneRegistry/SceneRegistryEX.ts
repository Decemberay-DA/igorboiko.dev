import ScenesRegistry from "./ScenesRegistry";

export default class SceneRegistryEX {
	public static debugState(registry: ScenesRegistry) {
		console.log("SceneRegistry.updateCache found cahsedIHTMLScene: ");
		console.log(registry.cahsedIHTMLScene);
		console.log("SceneRegistry.updateCache found cahsedITHREEScene: ");
		console.log(registry.cahsedITHREEScene);
		console.log("SceneRegistry.updateCache found cahsedIScenes: ");
		console.log(registry.cahsedIScenes);
	}
}
