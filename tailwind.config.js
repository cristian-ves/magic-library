/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                magicPurple: "#845ec2",
                deepPurple: "#b39cd0",
                lightPurple: "#fbeaff",
                magicGreen: "#00c9a7",
            },
            fontFamily: {
                heading: ["Cinzel", "serif"],
                body: ["Yusei Magic", "sans-serif"],
            },
            boxShadow: {
                glow: "0 0 6px 2px rgba(132, 94, 194, 0.5)",
            },
            backgroundImage: {
                "magic-gradient": "linear-gradient(90deg, #845ec2, #b39cd0)",
            },
        },
    },
    plugins: [
        require("@tailwindcss/forms"),
        require("@tailwindcss/typography"),
        require("tailwindcss-animate"),
    ],
};
