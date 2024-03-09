import * as DO from "../DinamicObjects/index";
import * as MC from "../MegaCursor/index";
import * as DU from "../DevUnilities/index";

/**
 * its goal is to ckick scene up.
 */
export class SceneConfigurator {
    public constructor() {}

    /**
     * Here i am setting up scene.
     * like adding main stuff in to it.
     * like in unity lol.
     */
    public start() {
        const floating = new DO.FloatingElements();
        floating.updateManagedElements("pv-js-live-floating"); // all elements woth this style is float

        const cursorStranding = null;
        const cursorDetector = null;
        const cursorPositionProvider = null;
        const cursor = new MC.MegaCursor();
        const betrayal = new MC.CursorBetrayal();

        DU.Logger.write("Scene was builded");
    }
}
