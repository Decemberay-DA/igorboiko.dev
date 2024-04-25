import asi from "@/scripts/asi/asi";
import type { THREE } from "@/scripts/ThreeJS/ThreeEngine/THREE";
import { pipe } from "fp-ts/lib/function";
import { map } from "fp-ts/lib/Array";
import { ThreeObjectFinderH } from "@/scripts/ThreeJS/ThreeEngine/Helpers/ThreeObjectFinderH";
import EGLTF_PARAMS from "@/scripts/ThreeJS/GLTFPipline/Enums/EGLTF_PARAMS";
import { GLTFH } from "../../../ThreeJS/GLTFPipline/GLTFH";
import { array, option, ord } from "fp-ts";
import type { IHTMLScene, IScene, ITHREEScene, TAnyScene } from "../IScene/IScene";

export default class ScenesRegistryH {
	/**
	 * this thing is appended to the end of htmlElements and cameras
	 */
	public static readonly SCENE_ID_IDENTIFICATOR = "SCENE_ID_IDENTIFICATOR";

	public static async findCommonIScenes(html?: IHTMLScene[], three?: ITHREEScene[]): Promise<IScene[]> {
		const htmlScenes = html ?? (await ScenesRegistryH.findHTMLScenes());
		const threeScenes = three ?? (await ScenesRegistryH.findTHREEScenes());

		function removeSceneIdIdentificator(inputString: string) {
			const suffix = "_SCENE_ID_IDENTIFICATOR";
			if (inputString.endsWith(suffix)) return inputString.slice(0, -suffix.length);
			return inputString;
		}

		return pipe(
			htmlScenes,
			array.map((html) => ({
				html: html,
				three: pipe(
					threeScenes,
					(scenes) =>
						scenes.find(
							(threeScene) => threeScene.nameID === removeSceneIdIdentificator(html.nameID)
						),
					option.fromNullable
				),
			})),
			array.map((res) =>
				option.isSome(res.three)
					? {
							...res.html,
							...res.three.value,
					  }
					: null
			),
			array.filter((a) => a !== null)
		);
	}

	public static async findTHREEScenes(): Promise<ITHREEScene[]> {
		return pipe(
			// find all camera cranes
			ThreeObjectFinderH.byUserData(
				// asi.data.ThreeScene,
				asi.data.ThreeSceneGLTF.scene,
				EGLTF_PARAMS.ROLE.this,
				EGLTF_PARAMS.ROLE.CAMERA_CRANE
			),
			// for each crete ITHREEScene
			array.map((crane) => ({
				nameID: pipe(
					GLTFH.getuserDataPropertyValue(crane, ScenesRegistryH.SCENE_ID_IDENTIFICATOR),
					option.match(
						() => "craneThatDoesNotHaveSceneAssigned",
						(name: string) => name
					)
				),
				crane: crane,
				camera: ThreeObjectFinderH.byUserData(
					crane, // search in this ones childs
					EGLTF_PARAMS.ROLE.this,
					EGLTF_PARAMS.ROLE.CRANED_CAMERA
				)[0] as THREE.PerspectiveCamera,
			}))
		);
	}

	/**
	 * @returns scenes with html elements whichs id ends with "SCENE_ID_IDENTIFICATOR"
	 */
	public static async findHTMLScenes(): Promise<IHTMLScene[]> {
		return pipe(
			document.querySelectorAll(`[id$='${ScenesRegistryH.SCENE_ID_IDENTIFICATOR}']`),
			Array.from,
			map((el: Element) => ({
				nameID: el.id,
				htmlElement: el as HTMLElement,
			}))
		);
	}

	public static async findISceneByName(nameID: string): Promise<option.Option<IScene>> {
		return pipe(
			asi.data.ScenesRegistry.cahsedIScenes,
			(scenes) => scenes.find((s) => s.nameID === nameID),
			option.fromNullable
		);
	}

	public static async findTAnySceneByNameID(nameID: string): Promise<option.Option<TAnyScene>> {
		const IScene = pipe(
			asi.data.ScenesRegistry.cahsedIScenes,
			array.findFirst((a) => a.nameID === nameID)
		);
		if (option.isSome(IScene)) return IScene;

		const IHTMLScene = pipe(
			asi.data.ScenesRegistry.cahsedIHTMLScene,
			array.findFirst((a) => a.nameID === nameID)
		);
		if (option.isSome(IHTMLScene)) return IHTMLScene;

		const ITHREEScene = pipe(
			asi.data.ScenesRegistry.cahsedITHREEScene,
			array.findFirst((a) => a.nameID === nameID)
		);
		if (option.isSome(ITHREEScene)) return ITHREEScene;

		return option.none;
	}
}
