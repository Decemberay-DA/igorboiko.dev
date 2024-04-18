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
				GACTIVEABLE: "#17304b",

				GACTIVE: "#64ffda",
				// eq from combination of thouse onew GACTIVE creates
				GACTIVERIGHT: "#FF3333",
				GACTIVELEFT: "#00CCCC",
			},
		},
	},
	plugins: [],
};
