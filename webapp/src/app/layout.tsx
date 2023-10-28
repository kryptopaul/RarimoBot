"use client";
// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";

import { MantineProvider, ColorSchemeScript } from "@mantine/core";

import "@rainbow-me/rainbowkit/styles.css";

import ClientLayout from "./Web3Provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <ClientLayout>
          <MantineProvider
            defaultColorScheme="dark"
            theme={{
              primaryColor: "blue",
            }}
          >
            {children}
          </MantineProvider>
        </ClientLayout>
      </body>
    </html>
  );
}
