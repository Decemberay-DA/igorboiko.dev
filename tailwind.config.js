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

				GACTIVEABLE: "#1BC3E9",
				GACTIVE: "#64ffda",

				GACTIVERIGHT: "#FF3333",
				GACTIVELEFT: "#00CCCC",

				// stolen hahah
				Navy: "#0a192f",
				LightNavy: "#112240",
				LightestNavy: "#233554",
				Slate: "#8892b0",
				LightSlate: "#a8b2d1",
				LightestSlate: "#ccd6f6",
				White: "#e6f1ff",
				Green: "#64ffda",
			},
		},
	},
	plugins: [],
};
