import ScenesRegistry from "./ScenesRegistry";

export default class SceneRegistryEX {
	public static debugState(registry: ScenesRegistry) {
		console.log("SceneRegistry.updateCache found cahsedIHTMLScene " + registry.cahsedIHTMLScene);
		console.log("SceneRegistry.updateCache found cahsedITHREEScene " + registry.cahsedITHREEScene);
		console.log("SceneRegistry.updateCache found cahsedIScenes " + registry.cahsedIScenes);
	}
}
