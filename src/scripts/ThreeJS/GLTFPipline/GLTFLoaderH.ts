import { GLTFLoader, type GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

/**
 * Its purpose is to give me loaded three scene object from ,gltf file
 */
export class GLTFLoaderH {
	public static async aGelLoadedGLTF(
		loadFromPath: string = "/public/models/scene.gltf",
		onProgress: (percentage: number) => void = () => {}
	): Promise<GLTF> {
		return new Promise((resolve, reject) => {
			new GLTFLoader().load(
				loadFromPath,
				(gltf) => resolve(gltf),
				(xhr) => onProgress((xhr.loaded / xhr.total) * 100),
				(error) => reject(error)
			);
		});
	}
}
