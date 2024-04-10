import asi from "../../asi/asi";
import * as GE from "../../GameEngine/index";
import { render, watchEffect, type VNode } from "vue";
import CursorFollowerStarSmall from "./CursorFollowerStarSmall.vue";
import VueSpecificks, { DOMContentFinallyWasLoadedOMG } from "@/scripts/VueTSHelper/VueSpecificks";
import asiSpecificks from "@/scripts/asi/asiSpesificks";
import { h } from "vue";
import { requestHandler, type INotificationHandler } from "mediatr-ts";

export default class CursorFollower extends GE.ADynamicObject {
	private foregroundStar!: VNode;
	private backgroundStar!: VNode;

	public constructor() {
		super();
	}

	public initVueVisuals() {
		if (asi.context.pageType === asiSpecificks.PageTypes.ERROR_404_PAGE) {
			this.foregroundStar = h(CursorFollowerStarSmall);
			this.backgroundStar = h(CursorFollowerStarSmall);
		} else {
			// load for main page
			this.foregroundStar = h(CursorFollowerStarSmall);
			this.backgroundStar = h(CursorFollowerStarSmall);
		}

		const flayer = VueSpecificks.DefinedComponents.CURSOR_STAR_FOREGROUND_FOLLOWER_LAYER.ntmlElement;
		const blayer = VueSpecificks.DefinedComponents.CURSOR_STAR_BACKGROUND_FOLLOWER_LAYER.ntmlElement;
		render(this.foregroundStar, flayer);
		render(this.backgroundStar, blayer);
	}

	public override onFrameUpdate(): void {
		CursorFollower.dragComponentToCursor2(this.foregroundStar, 1);
		CursorFollower.dragComponentToCursor2(this.backgroundStar, 10);
	}
	private static dragComponrntToCursor(star: VNode, dragForce: number) {
		if (star.props && star.props.style) {
			star.props.style.left = asi.context.Cursor.currentPosition.x + "px";
			star.props.style.top = asi.context.Cursor.currentPosition.y + "px";
		}
	}
	private static dragComponentToCursor2(star: VNode, dragForce: number) {
		if (star.props && star.props.style) {
			try {
				star.props.style.left = asi.context.Cursor.currentPosition.x + "px";
				star.props.style.top = asi.context.Cursor.currentPosition.y + "px";
			} catch (error) {
				console.error("Error updating component style:", error);
			}
		}
	}
}

@requestHandler(Request)
class InitCursorVisuals implements INotificationHandler<DOMContentFinallyWasLoadedOMG> {
	handle(notification: DOMContentFinallyWasLoadedOMG): Promise<void> {
		asi.context.CursorFollower.initVueVisuals();
		return Promise.resolve();
	}
}
