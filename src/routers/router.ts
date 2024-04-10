import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import MainPageView from "@/views/MainPageView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import ScrollBehaviour from "./scrollBehaviour";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "home",
		component: MainPageView,
		meta: { preserveState: true },
	},
	{
		path: "/:pathMatch(.*)*",
		name: "NotFound",
		component: NotFoundView,
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
	scrollBehavior: ScrollBehaviour.behaviour,
});

export default router;
