import React from "react";
import { createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({
  /** Put your mantine theme override here */
});

// Default implementation, that you can customize
export default function Root({ children }) {
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
}
