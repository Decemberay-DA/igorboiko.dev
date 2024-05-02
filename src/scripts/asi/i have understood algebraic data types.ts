import { time } from "console";
import { array, option } from "fp-ts";
import { pipe } from "fp-ts/lib/function";
import { readonly } from "vue";
import randomH from "../utils/randomH";

/**
 * used for pattern matching
 */
interface URI<U> {
	readonly _uri: U;
}

const isURIEquals = (a: URI<string>, b: URI<string>): boolean => a._uri === b._uri;

/**
 * algebraic data type for enableable objects
 */
interface enableable extends URI<enableableURI> {
	state: boolean;
}

type enableableURI = "enableable";

const newEnableable = (): enableable => ({
	_uri: "enableable",
	state: true,
});

const concatEnableable = (a: enableable, b: enableable): enableable => ({
	_uri: "enableable",
	state: a.state || b.state,
});

const enable = (obj: enableable): enableable => {
	obj.state = true;
	return obj;
};
const disable = (obj: enableable): enableable => {
	obj.state = false;
	return obj;
};
const setEnableableState =
	(state: boolean) =>
	(obj: enableable): enableable => {
		obj.state = state;
		return obj;
	};

/**
 * algebraic data type for updateable objects
 */
interface updateable extends URI<updateableURI> {
	onStart: (time: number) => void;
	onUpdate: (time: number) => void;
	onEnd: (time: number) => void;
}

type updateableURI = "updateable";

interface UpdateableOptions {
	onStart?: (time: number) => void;
	onUpdate?: (time: number) => void;
	onEnd?: (time: number) => void;
}
const newEmptyUpdateableOptions = (): UpdateableOptions => ({
	onStart: (time: number) => {},
	onUpdate: (time: number) => {},
	onEnd: (time: number) => {},
});

const newUpdateable = (
	{
		onStart = (time: number) => {},
		onUpdate = (time: number) => {},
		onEnd = (time: number) => {},
	}: UpdateableOptions = newEmptyUpdateableOptions()
): updateable => ({
	_uri: "updateable",
	onStart,
	onUpdate,
	onEnd,
});
const newEmptyUpdateable = (): updateable => ({
	_uri: "updateable",
	onStart: (time: number) => {},
	onUpdate: (time: number) => {},
	onEnd: (time: number) => {},
});

const concatUpdateable = (a: updateable, b: updateable): updateable => ({
	_uri: "updateable",
	onStart: (time: number) => {
		a.onStart(time);
		b.onStart(time);
	},
	onUpdate: (time: number) => {
		a.onUpdate(time);
		b.onUpdate(time);
	},
	onEnd: (time: number) => {
		a.onEnd(time);
		b.onEnd(time);
	},
});

/**
 * algebraic data type for dinamic objects
 */
type dinamicObject = URI<dinamicObjectURI> &
	(
		| {
				updateable: updateable;
		  }
		| {
				updateable: updateable;
				enableable: enableable;
		  }
	);

type dinamicObjectURI = "std" | "enb";

const newSimpleDinamicObject = (upd: updateable): dinamicObject => ({
	_uri: "std",
	updateable: upd,
});
const newFullDinamicObject = (upd: updateable): dinamicObject => ({
	_uri: "enb",
	updateable: upd,
	enableable: newEnableable(),
});

const concatdinamicObject = (a: dinamicObject, b: dinamicObject): dinamicObject => {
	const isAtLeastOneIs_enb = a._uri === "enb" || b._uri === "enb";
	if (isAtLeastOneIs_enb) {
		return {
			_uri: "enb",
			updateable: concatUpdateable(a.updateable, b.updateable),
			enableable: concatEnableable((a as any).enableable, (b as any).enableable),
		};
	}
	return {
		_uri: "std",
		updateable: concatUpdateable(a.updateable, b.updateable),
	};
};

const isDinamicObjectEnabled = (obj: dinamicObject): boolean => {
	const matched = {
		std: () => false,
		enb: () => (obj as any).enableable.state,
	}[obj._uri]();
	return matched;
};

type updFuncExecutorType<Target> = (time: number) => (obj: Target) => Target;
const start: updFuncExecutorType<dinamicObject> =
	(time: number) =>
	(obj: dinamicObject): dinamicObject => {
		const matched = {
			std: () => obj.updateable.onStart(time),
			enb: () => {
				if ((obj as any).enableable) obj.updateable.onStart(time);
			},
		}[obj._uri]();
		return obj;
	};
const update: updFuncExecutorType<dinamicObject> =
	(time: number) =>
	(obj: dinamicObject): dinamicObject => {
		const matched = {
			std: () => obj.updateable.onUpdate(time),
			enb: () => {
				if ((obj as any).enableable) obj.updateable.onUpdate(time);
			},
		}[obj._uri]();
		return obj;
	};
const end: updFuncExecutorType<dinamicObject> =
	(time: number) =>
	(obj: dinamicObject): dinamicObject => {
		const matched = {
			std: () => obj.updateable.onEnd(time),
			enb: () => {
				if ((obj as any).enableable) obj.updateable.onEnd(time);
			},
		}[obj._uri]();
		return obj;
	};

/**
 * algebraic data type for hierarchical objects
 */
interface parentable<P, CH> extends URI<parentableURI> {
	parent: option.Option<P>;
	children: CH[];
}

type parentableURI = "parentable";

const newEmptyParentable = <P, CH>(parent: option.Option<P>, ...children: CH[]): parentable<P, CH> => ({
	_uri: "parentable",
	parent,
	children: children.length === 0 ? [] : children,
});

const concatParentable = <P, CH>(a: parentable<P, CH>, b: parentable<P, CH>): parentable<P, CH> => ({
	_uri: "parentable",
	parent: pipe(
		a.parent,
		option.orElse(() => b.parent)
	),
	children: [...a.children, ...b.children],
});

const addChild = <P, CH>(parent: parentable<P, CH>, child: CH): void => {
	parent.children.push(child);
};
const removeChild = <P, CH>(parent: parentable<P, CH>, child: CH): void => {
	const index = parent.children.indexOf(child);
	if (index !== -1) {
		parent.children.splice(index, 1);
	}
};

/**
 * algebraic data type for game object
 */
interface gameObject extends URI<gameObjectURI> {
	hierarchy: parentable<gameObject, gameObject>;
	dinamic: dinamicObject;
}

type gameObjectURI = "gameObject";

const newGameObject = (dinamic: dinamicObject): gameObject => ({
	_uri: "gameObject",
	hierarchy: newEmptyParentable<gameObject, gameObject>(option.none),
	dinamic: dinamic,
});

const concatGameObject = (a: gameObject, b: gameObject): gameObject => ({
	_uri: "gameObject",
	hierarchy: concatParentable(a.hierarchy, b.hierarchy),
	dinamic: concatdinamicObject(a.dinamic, b.dinamic),
});

/**
 * functions for game type specific of game object
 */
const traverseChildren =
	(updFunc: updFuncExecutorType<dinamicObject>) =>
	(time: number) =>
	<P, T extends dinamicObject>(obj: parentable<P, T>): parentable<P, T> => {
		const check = pipe(
			obj.children,
			array.map((child) => updFunc(time)(child))
		);
		return obj;
	};

const startGame =
	(time: number) =>
	(obj: gameObject): gameObject => {
		traverseChildren(start)(time);
		return obj;
	};
const updateGame =
	(time: number) =>
	(obj: gameObject): gameObject => {
		traverseChildren(update)(time);
		return obj;
	};
const endGame =
	(time: number) =>
	(obj: gameObject): gameObject => {
		traverseChildren(end)(time);
		return obj;
	};

const newGameSpecedGO = (): gameObject => ({
	_uri: "gameObject",
	hierarchy: newEmptyParentable<gameObject, gameObject>(option.none),
	dinamic: pipe(
		newUpdateable({ onStart: startGame, onUpdate: updateGame, onEnd: endGame }), //
		newFullDinamicObject
	),
});

/**
 * infinite loop
 */
interface LoopDataBag {
	readonly frameCount: number;
	readonly currentTime: number;
	readonly deltaTime: number;
}
const newInfiniteLoopBehaviour =
	(isKeepGoing: () => boolean, isActive: () => boolean) =>
	(action: (loopData: LoopDataBag) => void): (() => void) => {
		let frameCount = 0;
		let previousFrameTime = 0;

		const loop = (): void => {
			if (isKeepGoing()) {
				const currentTime = performance.now();
				const deltaTime = currentTime - previousFrameTime;
				previousFrameTime = currentTime;

				const bag: LoopDataBag = {
					frameCount,
					currentTime,
					deltaTime,
				};
				if (isActive()) {
					action(bag);
				}

				requestAnimationFrame(loop);
			}
		};

		return loop;
	};

const gameObjectLifeCycleBahviour =
	(killSignal: () => boolean) =>
	(go: gameObject): ((loopData: LoopDataBag) => void) => {
		let wasStarted = () => false;
		let wasEnded = () => false;

		const updateLoop = (loopData: LoopDataBag): void => {
			if (!wasStarted) {
				wasEnded = () => true;
				startGame(loopData.currentTime)(go);
			}

			updateGame(loopData.currentTime)(go);

			if (killSignal()) {
				wasEnded = () => true;
				endGame(loopData.currentTime)(go);
			}
		};

		const loop = newInfiniteLoopBehaviour(
			() => wasEnded(),
			() => isDinamicObjectEnabled(go.dinamic)
		)(updateLoop);

		return loop;
	};

const newRootGameObject = (): gameObject => {
	const isAlive = () => true;
	const go = newGameSpecedGO();
	const behavoiur = gameObjectLifeCycleBahviour(isAlive)(go);

	const loop = newInfiniteLoopBehaviour(
		isAlive, //
		() => isDinamicObjectEnabled(go.dinamic)
	)(behavoiur);

	loop();

	return go;
};

// i have understood algebraic data types.

// usage

export const createSillyGame = () => {
	const rootGame = newRootGameObject();

	const timeLogger = pipe(
		{
			onStart: (time: number) => console.log("start", time),
			onUpdate: (time: number) => console.log("update", time),
			onEnd: (time: number) => console.log("end", time),
		},
		newUpdateable,
		newFullDinamicObject,
		newGameObject
	);
	addChild(rootGame.hierarchy, timeLogger);

	const wrapInQuotse = (str: string): string => `"${str}"`;
	const prependWord =
		(word: string) =>
		(str: string): string =>
			word + " " + str;
	const loremus = [
		"lorem",
		"ipsum",
		"dolor",
		"sit",
		"amet",
		"consectetur",
		"adipiscing",
		"elit",
		"donec",
		"nibh",
	];
	const loremIpsumesLogger = pipe(
		{
			onUpdate: (time: number) => {
				const sentence = pipe(
					loremus,
					array.filter((word) => randomH.floatneg1to1() > 0),

					array.reduce("", (acc, word) => acc + " " + word),
					option.fromNullable,
					option.match(
						() => "no words",
						(str) => prependWord("Do")(str)
					),
					wrapInQuotse
				);
				console.log("Lorem sas: " + sentence);
			},
		},
		newUpdateable,
		newFullDinamicObject,
		newGameObject
	);
	addChild(rootGame.hierarchy, loremIpsumesLogger);
};
