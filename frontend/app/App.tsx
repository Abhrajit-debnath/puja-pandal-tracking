import { MantineProvider } from "@mantine/core";
import { AppTheme } from "../app/theme/AppTheme";

export default function App({ children }: { children: React.ReactNode }) {
    return <MantineProvider theme={AppTheme}>{children}</MantineProvider>;
}