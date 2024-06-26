import { GLTFLoader, type GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

/**
 * Its purpose is to give me loaded three scene object from ,gltf file
 */
export class GLTFLoaderH {
	static aGetLoadedGLTF = (
		onProgress: (percentage: number) => void = () => {},
		loadFromPath: string = "/public/models/scene.gltf"
	): Promise<GLTF> => {
		return new Promise((resolve, reject) => {
			new GLTFLoader().load(
				loadFromPath,
				(gltf) => resolve(gltf),
				(xhr) => onProgress((xhr.loaded / xhr.total) * 100),
				(error) => reject(error)
			);
		});
	};
}
