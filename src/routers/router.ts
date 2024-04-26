import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import ScrollBehaviourH from "./ScrollBehaviourH";
import App from "@/App.vue";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "home",
		component: App,
		meta: { preserveState: true },
	},
	{
		path: "/:pathMatch(.*)*",
		redirect: "/",
	},
	// {
	// 	path: "/:pathMatch(.*)*",
	// 	name: "NotFound",
	// 	component: App,
	// },
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
	scrollBehavior: ScrollBehaviourH.behaviour,
});

export default router;
