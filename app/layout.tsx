import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata: Metadata = {
  title: "CrudStudio — We build serious, scalable products.",
  description:
    "CrudStudio is an independent product studio building scalable web, mobile, and SaaS platforms with Next.js, React Native, Node, and MongoDB.",
  metadataBase: new URL("https://crudstudio.com"),
  openGraph: {
    title: "CrudStudio — We build serious, scalable products.",
    description: "Independent product studio. Web, mobile, SaaS, CRM.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=JetBrains+Mono:wght@400;500;700&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ScrollProgress />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
