import NavigationBar from "@/components/organisms/NavigationBar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NavigationBar />
        {children} {/* This renders the current page content */}
      </body>
    </html>
  );
}
