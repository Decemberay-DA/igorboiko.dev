import type { INotificationHandler } from "@/scripts/asi/OneFileMediator/OneFileMediator";
import type ETAnyInterractionOccured from "../Events/ETAnyInterractionOccured";
import { flow, pipe, tupled } from "fp-ts/lib/function";
import asi from "@/scripts/asi/asi";
import { ThreeObjectFinderH } from "@/scripts/ThreeJS/ThreeEngine/Helpers/ThreeObjectFinderH";
import { array, option } from "fp-ts";
import { MATHJS, TWEEN } from "@/scripts/FrameworksExport";
import { ICoroutineB, type ICoroutine } from "@/scripts/GameEngineFunctional/Types/ICoroutine";
import { Bro } from "@/scripts/GameEngineFunctional/FunctionalBroH";
import { THREE } from "@/scripts/ThreeJS";
import { AngleH } from "@/scripts/utils/AngleH";
import type { Euler } from "three";
import type { ID } from "@/scripts/GameEngineFunctional/ADTs/ID.ts/types";
import type { IDinamicObject } from "@/scripts/GameEngineFunctional/ADTs/IDinamicObject/IDinamicObject";
import type { IRootGame } from "@/scripts/GameEngineFunctional/ADTs/IDinamicObject/builders";
import type { IDinamicUpdate } from "@/scripts/GameEngineFunctional/ADTs/IDinamicUpdate/IDinamicUpdate";
import type { URI } from "fp-ts/lib/Predicate";

/**
 *
 */
export default class EHTweenCubes implements INotificationHandler<ETAnyInterractionOccured> {
	private static cube_tween = new Map<THREE.Object3D, TWEEN.Tween<Euler>>();

	async handle(notification: ETAnyInterractionOccured): Promise<void> {
		const stuff = pipe(
			// broken
			asi.data.ThreeScene,
			ThreeObjectFinderH.byIncludedName("TheCube"),
			array.map((obj) => {
				if (EHTweenCubes.cube_tween.get(obj)?.isPlaying()) {
					EHTweenCubes.cube_tween.get(obj)?.stop();
					EHTweenCubes.cube_tween.delete(obj);
				}

				const end = {
					x: obj.rotation.x,
					y: obj.rotation.y,
					z: obj.rotation.z + AngleH.degrees_to_radians(90),
				};

				const tw = new TWEEN.Tween(obj.rotation) //
					.to(end, 512)
					.easing(TWEEN.Easing.Linear.InOut)
					.onStart((euler) => {
						EHTweenCubes.cube_tween.set(obj, tw);
					});

				return ICoroutineB.newFromTweenAsGameRoot(tw, (x) => {
					EHTweenCubes.cube_tween.delete(obj);
				});
			})
		);

		return Promise.resolve();
	}
}
