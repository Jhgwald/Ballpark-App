// Root layout - wraps all pages
// Sets up fonts, metadata, and global styles

import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ballpark Trip Planner',
  description: 'Plan your perfect baseball road trip with AI assistance',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
          {children}
        </main>
      </body>
    </html>
  );
}
