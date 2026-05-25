import "./globals.css";

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
        <div className="max-w-6xl mx-auto px-6">
          {children}
        </div>
      </body>
    </html>
  );
}