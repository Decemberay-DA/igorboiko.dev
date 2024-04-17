import { asi } from "../asi/asi";
import { ScrollToSectionCoroutined } from "../CameraManagiment/Commands/ScrollToSectionCoroutined";
import { GE } from "../GameEngine";
import { THREE } from "../ThreeJS/THREE";

/**
 * rotate this object so its Y axis is alway pointing to the camera idk
 */
export class CameraAlligner extends GE.ADynamicObject {
	public readonly object!: THREE.Object3D;
	public get camera() {
		return asi.data.THREE_MANAGIMENTED_SCENE.camera;
	}
	public override onFrameUpdate(): void {
		const direction = new THREE.Vector3()
			.subVectors(this.camera.position, this.object.position)
			.normalize();

		this.object.lookAt(this.camera.position);
	}
}

interface ICommand {
	__do(): void;
	undo(): void;
}

const offsetAll: ICommand = {
	__do() {},
	undo() {},
};

interface TCommandBuilder<target, config> {
	(target: target, config: config): ICommand;
}

class PageScrollCommandBuilder {
	static ScrollTo(
		target: any,
		config: {
			nextSection: string;
			tweenTime: number;
		}
	): ICommand {
		const oldSection = asi.context.section;
		const command: ICommand = {
			__do() {
				ScrollToSectionCoroutined.instance.launchTransitionCoroutine(
					config.nextSection,
					config.tweenTime
				);
			},
			undo() {
				ScrollToSectionCoroutined.instance.launchTransitionCoroutine(
					oldSection.name,
					config.tweenTime
				);
			},
		};

		return command;
	}
}

class CommandStack {
	private static history = new Array<ICommand>();

	static AddAndExecute(command: ICommand) {
		this.history.push(command);
		command.__do();
	}
}
