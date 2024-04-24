/** @type {import('tailwindcss').Config} */
export default {
	content: [],
	purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				GBACKGROUND: "var(--tw-GBACKGROUND, #0a192f)",

				GGRAY: "var(--tw-GGRAY, #8892b0)",
				GWHITE: "var(--tw-GWHITE, #ccd6f6)",

				GACTIVEABLE: "var(--tw-GACTIVEABLE, #1BC3E9)",
				GACTIVE: "var(--tw-GACTIVE, #64ffda)",

				GACTIVERIGHT: "var(--tw-GACTIVERIGHT, #FF3333)",
				GACTIVELEFT: "var(--tw-GACTIVELEFT, #00CCCC)",

				// stolen hahah
				Navy: "var(--tw-Navy, #0a192f)",
				LightNavy: "var(--tw-LightNavy, #112240)",
				LightestNavy: "var(--tw-LightestNavy, #233554)",
				Slate: "var(--tw-Slate, #8892b0)",
				LightSlate: "var(--tw-LightSlate, #a8b2d1)",
				LightestSlate: "var(--tw-LightestSlate, #ccd6f6)",
				White: "var(--tw-White, #e6f1ff)",
				Green: "var(--tw-Green, #64ffda)",
			},
		},
	},
	plugins: [],
};

