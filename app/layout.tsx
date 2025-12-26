import "./globals.css";
import Nav from "./components/Nav";
import { LangProvider } from "./lang-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body className="bg-neutral-900 text-white">
        <LangProvider>
          {children}
          <Nav />
        </LangProvider>
      </body>
    </html>
  );
}
