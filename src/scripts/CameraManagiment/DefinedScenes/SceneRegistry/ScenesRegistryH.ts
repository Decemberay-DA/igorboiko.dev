import asi from "@/scripts/asi/asi";
import type { THREE } from "@/scripts/ThreeJS/ThreeEngine/THREE";
import { pipe } from "fp-ts/lib/function";
import { fromNullable } from "fp-ts/lib/Option";
import { map } from "fp-ts/lib/Array";
import { ThreeObjectFinderH } from "@/scripts/ThreeJS/ThreeEngine/Helpers/ThreeObjectFinderH";
import EGLTF_PARAMS from "@/scripts/ThreeJS/GLTFPipline/Enums/EGLTF_PARAMS";
import { GLTFH } from "../../../ThreeJS/GLTFPipline/GLTFH";
import { array, option, ord } from "fp-ts";
import * as O from "fp-ts/Option";
import type { IHTMLScene, IScene, ITHREEScene, TAnyScene } from "../IScene/IScene";

export default class ScenesRegistryH {
	/**
	 * this thing is appended to the end of htmlElements and cameras
	 */
	public static readonly SCENE_ID_IDENTIFICATOR = "SCENE_ID";

	public static async findCommonIScenes(html?: IHTMLScene[], three?: ITHREEScene[]): Promise<IScene[]> {
		const htmlScenes = html ?? (await ScenesRegistryH.findHTMLScenes());
		const threeScenes = three ?? (await ScenesRegistryH.findTHREEScenes());

		return pipe(
			htmlScenes,
			array.map((html) => ({
				html: html,
				three: pipe(
					threeScenes,
					(scenes) => scenes.find((threeScene) => threeScene.nameID === html.nameID),
					fromNullable
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
			ThreeObjectFinderH.byUserData(
				asi.data.ThreeScene,
				EGLTF_PARAMS.ROLE.this,
				EGLTF_PARAMS.ROLE.CAMERA_CRANE
			),
			array.map((crane) => ({
				nameID: pipe(
					GLTFH.getUserDataValue(crane, ScenesRegistryH.SCENE_ID_IDENTIFICATOR),
					O.match(
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

	public static async findHTMLScenes(): Promise<IHTMLScene[]> {
		return pipe(
			document.querySelectorAll("[id$='SCENE_ID']"),
			Array.from,
			map((el: Element) => ({
				nameID: el.id,
				htmlElement: el as HTMLElement,
			}))
		);
	}
	public static findISceneByName(nameID: string): option.Option<IScene> {
		return pipe(
			asi.data.ScenesRegistry.cahsedIScenes,
			(scenes) => scenes.find((s) => s.nameID === nameID),
			fromNullable
		);
	}

	public static findTAnySceneByNameID(nameID: string): option.Option<TAnyScene> {
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
