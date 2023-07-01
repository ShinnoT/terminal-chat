/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            width: {
                "10/100": "10%",
                "90/100": "90%",
                "91/100": "91%",
                "7/100": "7%",
                "93/100": "93%",
                "17/100": "17%",
                "83/100": "83%",
                "18/100": "18%",
                "82/100": "82%",
                "19/100": "19%",
                "81/100": "81%",
                "20/100": "20%",
                "80/100": "80%",
                "5/100": "5%",
                "94/100": "94%",
                "89/100": "89%",
            },
        },
    },
    plugins: [],
};
