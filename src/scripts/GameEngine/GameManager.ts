import * as DU from "../DevUnilities/index";
import * as GE from "./index";

export class GameManagering {
    // private theGame!: GE.Game; // no singletons
    // private theGameTime!: GE.GameTime;

    private static instance: GameManagering;
    private constructor() {}
    public static getInstance(): GameManagering {
        if (!GameManagering.instance) {
            GameManagering.instance = new GameManagering();
        }
        return GameManagering.instance;
    }

    public start(): void {
        GE.Game.getInstance().triggerStart();
        DU.Logger.write("GameManager started");
    }
}
