import { Container, Theme } from "@radix-ui/themes";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./NavBar";
import "./globals.d.ts";
import AuthProvider from "./auth/Provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "Issue Tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <AuthProvider>
          <Theme accentColor="violet" panelBackground="solid" radius="large">
            <NavBar />
            <main className="p-5">
              <Container>{children}</Container>
            </main>
            {/* <ThemePanel></ThemePanel> */}
          </Theme>
        </AuthProvider>
      </body>
    </html>
  );
}
