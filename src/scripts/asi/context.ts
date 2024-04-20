
export default class context {
	// app ========-====-====-====-============
	/**
	 * SideEffects:
	 * - user scroll
	 *
	 * not SideEffects:
	 * - button pressed in navbar
	 */
	public get isAllowedToChangeScenesBySideEffects() {
		return (
			// asi.context.appContext !== asiSpecificks.Contextes.EXPANDED_SUBPAGE_VIEW &&
			// asi.context.appContext !== asiSpecificks.Contextes.INTRO_CUTSCENE &&
			this.isAbleCursorSectionSwitching
		);
	}
	public isAbleCursorSectionSwitching = true;

	// public readonly appContext = asiSpecificks.Contextes.INTRO_CUTSCENE;

	// public readonly pageType = asiSpecificks.PageTypes.MAIN_PAGE;
}
