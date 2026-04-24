
import type {Metadata} from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';


export const metadata: Metadata = {
  title: 'FORGOTTEN // Developer Arsenal',
  description: 'An open-source boss system for next-level game developers.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-black text-white selection:bg-red-600 selection:text-white">
        <div className="scanline" />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
