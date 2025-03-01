import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from './ClientLayout';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Globetrotter Challenge",
  description: "Test your knowledge of famous destinations around the world!",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/globe-favicon.svg', type: 'image/svg+xml' }
    ],
    apple: { url: '/favicon.ico', sizes: 'any' }
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
