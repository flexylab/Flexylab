import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Flexylab - E-commerce with Animated Design',
  description: 'Shop premium products on Flexylab - innovative e-commerce platform with beautiful animations and secure checkout.',
  keywords: ['e-commerce', 'shop', 'products', 'online store', 'flexylab'],
  authors: [{ name: 'Flexylab Team' }],
  creator: 'Flexylab',
  publisher: 'Flexylab',
  
  // Open Graph (สำหรับ Facebook, Twitter, WhatsApp)
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://flexylab.shop',
    siteName: 'Flexylab',
    title: 'Flexylab - Premium E-commerce Platform',
    description: 'Shop premium products on Flexylab - innovative e-commerce with beautiful animations.',
    images: [
      {
        url: 'https://flexylab.shop/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Flexylab',
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Flexylab - Premium E-commerce',
    description: 'Shop premium products on Flexylab.',
    images: ['https://flexylab.shop/og-image.jpg'],
  },

  // Robots (ให้ Google index)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },

  // Canonical URL
  alternates: {
    canonical: 'https://flexylab.shop',
  },

  // Viewport
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://api.resend.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        
        {/* Sitemap */}
        <link rel="sitemap" href="/sitemap.xml" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        
        {/* Theme Color */}
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body>{children}</body>
    </html>
  );
}
