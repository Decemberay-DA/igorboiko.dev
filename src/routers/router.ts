import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import ScrollBehaviour from "./scrollBehaviour";
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
		name: "NotFound",
		component: App,
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
	scrollBehavior: ScrollBehaviour.behaviour,
});

export default router;
