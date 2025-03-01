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
      { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/globe-favicon.svg', type: 'image/svg+xml' }
    ],
    apple: { url: '/icons/apple-touch-icon.png', type: 'image/png' },
    other: [
      {
        rel: 'apple-touch-icon',
        url: '/icons/apple-touch-icon.png',
      },
      {
        rel: 'manifest',
        url: '/site.webmanifest'
      }
    ]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
