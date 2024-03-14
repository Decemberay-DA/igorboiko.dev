import * as DO from "../DinamicObjects/index";
import * as MC from "../MegaCursor/index";
import * as DU from "../DevUnilities/index";
import * as TJ from "../ThreeJS/index";
import { GE } from ".";
import BackgroundMaterial from "../ThreeJS/BackgroundShader/BackgroundMaterial";

/**
 * its goal is to ckick scene up.
 */
export default class SceneConfigurator {
    public constructor() {}

    /**
     * Here i am setting up scene.
     * like adding main stuff in to it.
     * like in unity lol.
     */
    public start() {
        const timeUpdater = new GE.GameTime();

        // all elements woth this style is float
        DO.FloatingElementsFactory.registerFloatingObjectsForClass(
            "pv-js-live-floating-subject"
        );

        // Here is bug. How to create a scene in .vue component and setup it here?
        // Maybe have a static data class where i will store all three scenes.
        const three = new TJ.ThreeScene(
            document.getElementById("") as HTMLElement
        );

        const bgMat = new BackgroundMaterial();

        const cursorStranding = null;
        const cursorDetector = null;
        const cursorPositionProvider = null;
        const cursor = new MC.MegaCursor();
        const betrayal = new MC.CursorBetrayal();

        DU.Logger.write("Scene was builded");
    }
}
