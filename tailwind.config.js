/** @type {import('tailwindcss').Config} */
export default {
	content: [],
	purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				GBACKGROUND: "#0a192f",
				GGRAY: "#8892b0",
				GWHITE: "#ccd6f6",
				GACTIVATABLE: "#17304b",
				GACTIVE: "#64ffda",
			},
		},
	},
	plugins: [],
};
