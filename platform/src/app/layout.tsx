import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HAI Group | Delivering Certainty Across Complex Projects",
  description:
    "HAI is an employer representative and project delivery partner. We strengthen governance, control risk, and protect the owner's commercial position.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
