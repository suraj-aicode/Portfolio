import "./globals.css";
import SmoothScroller from "@/components/SmoothScroller";

export const metadata = {
  title: "Cohot2 Portfolio",
  description: "My personal portfolio website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <SmoothScroller>{children}</SmoothScroller>
      </body>
    </html>
  );
}
