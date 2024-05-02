import { time } from "console";
import { array, option } from "fp-ts";
import { pipe } from "fp-ts/lib/function";

/**
 * used for pattern matching
 */
interface URI<U> {
	readonly _uri: U;
}

const newURI = (uri: string): URI<string> => ({
	_uri: uri,
});

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

const newUpdateable = (
	onStart: (time: number) => void,
	onUpdate: (time: number) => void,
	onEnd: (time: number) => void
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

const newSimpleObject = (upd: updateable): dinamicObject => ({
	_uri: "std",
	updateable: upd,
});
const newFullObject = (upd: updateable): dinamicObject => ({
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

const newEmptyParentable = <P, CH>(parent: option.Option<P>, children: CH[]): parentable<P, CH> => ({
	_uri: "parentable",
	parent,
	children,
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
	hierarchy: parentable<gameObject, gameObject[]>;
	updateable: updateable;
}

type gameObjectURI = "gameObject";

const newGameObject = (updateable: updateable): gameObject => ({
	_uri: "gameObject",
	hierarchy: newEmptyParentable(option.none, []),
	updateable,
});

const concatGameObject = (a: gameObject, b: gameObject): gameObject => ({
	_uri: "gameObject",
	hierarchy: concatParentable(a.hierarchy, b.hierarchy),
	updateable: concatUpdateable(a.updateable, b.updateable),
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

const newEmptyGameSpecificObject = (): gameObject => ({
	_uri: "gameObject",
	hierarchy: newEmptyParentable(option.none, []),
	updateable: newUpdateable(startGame, updateGame, endGame),
});

// i have understood algebraic data types.
