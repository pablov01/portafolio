import "./globals.css";
import SceneWrapper from "@/components/three/SceneWrapper";

export const metadata = {
  title: "Pablo Villalba | Portfolio",
  description: "Backend & DevOps Developer Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 py-2 focus:text-black"
        >
          Skip to content
        </a>
        <SceneWrapper />
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
          {children}
        </div>
      </body>
    </html>
  );
}