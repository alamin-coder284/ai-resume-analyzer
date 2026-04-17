import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "AI Resume Analyzer",
  description: "Analyze resumes with Gemini in a simple W3Schools-style interface.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="w3-topbar">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
            <Link href="/" className="w3-brand py-3">
              Resume Analyzer
            </Link>
            <nav className="flex items-center gap-1">
              <Link href="/" className="w3-nav-link">
                Home
              </Link>
              <Link href="/upload" className="w3-nav-link">
                Upload
              </Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
