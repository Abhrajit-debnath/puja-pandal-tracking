import { createTheme, MantineThemeOverride } from "@mantine/core";



export const AppTheme: MantineThemeOverride = createTheme({
    fontFamily: "var(--font-nunito)",
    colors: {

        sacredWine: [
            "#fdf2f4",
            "#f9e5e7",
            "#f3c9ce",
            "#eb9ea6",
            "#e2727e",
            "#d54f5f",
            "#bd3445",
            "#9e2736",
            "#842330",
            "#1c0508", // Base Dark
        ],
        saffronGold: [
            "#fff8eb",
            "#fef0d2",
            "#fde0a5",
            "#fbc972",
            "#f9ae43",
            "#f89b25",
            "#e59b2c", // Primary Gold
            "#c77610",
            "#9e5c0e",
            "#804a11",
        ],
    },
    primaryColor: "saffronGold",
    primaryShade: 6,
    radius: {
        xs: "0.5rem",
        sm: "1rem",
        md: "1.25rem",
        lg: "1.5rem",
        xl: "2rem",
    },
});

