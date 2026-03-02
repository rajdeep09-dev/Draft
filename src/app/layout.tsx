import type { Metadata, Viewport } from 'next'
import '../styles/globals.css'
import '../styles/webflow.css'
import '../styles/mouse-follower.css'
import '../styles/ui-loader.css'

export const metadata: Metadata = {
  title: 'Draft | AI-Powered Content Workflow',
  description: 'Draft is an AI-powered platform that helps teams create, manage, and publish content at scale with speed and intelligence.',
  openGraph: {
    title: 'Draft | AI-Powered Content Workflow',
    description: 'Draft is an AI-powered platform that helps teams create, manage, and publish content at scale with speed and intelligence.',
    url: 'https://www.trydraftt.com',
    siteName: 'Draft',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Draft | AI-Powered Content Workflow',
    description: 'Draft is an AI-powered platform that helps teams create, manage, and publish content at scale with speed and intelligence.',
    images: ['/images/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
  },
  metadataBase: new URL('https://www.trydraftt.com'),
  canonical: 'https://www.trydraftt.com',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#030625' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      data-wf-domain="www.trydraftt.com"
      data-wf-page="68b58ec383c7eab030ec6c4f"
      data-wf-site="68b58ec283c7eab030ec6bab"
      className="w-mod-js w-mod-touch w-mod-ix lenis lenis-smooth w-mod-ix3"
      data-theme="light"
      style={{
        '--font-family': "'Inter', sans-serif",
        '--border-radius': '6px',
        '--white': '#ffffff',
        '--dark': '#030625',
        '--blue-primary': '#225aea',
        '--blue-depressed': '#1448cb',
        '--blue-light': '#f2f6ff',
        '--blue-dark': '#000e58',
        '--red-primary': '#d71313',
        '--red-depressed': '#9e1414',
        '--green-primary': '#16895a',
        '--yellow-primary': '#f6b60e',
        '--neutral-100': '#f2f3f8',
        '--neutral-200': '#e2e6f3',
        '--neutral-300': '#c5cce3',
        '--neutral-400': '#a1aac8',
        '--neutral-500': '#707ba0',
        '--neutral-600': '#434c69',
        '--neutral-700': '#2b3450',
        '--neutral-800': '#151e3a',
        '--neutral-900': '#030625',
      } as React.CSSProperties}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://www.trydraftt.com" />
        {/* Webflow Font Declarations */}
        <style dangerouslySetInnerHTML={{__html: `
          @font-face {
            font-family: "Rawest";
            src: url('/fonts/Rawest-Regular.woff2') format('woff2');
            font-weight: 400;
            font-display: swap;
          }
          @font-face {
            font-family: "Rawest";
            src: url('/fonts/Rawest-Light.woff2') format('woff2');
            font-weight: 300;
            font-display: swap;
          }
          @font-face {
            font-family: "Rawest";
            src: url('/fonts/Rawest-ExtraLight.woff2') format('woff2');
            font-weight: 200;
            font-display: swap;
          }
          @font-face {
            font-family: "Rawest";
            src: url('/fonts/Rawest-Thin.woff2') format('woff2');
            font-weight: 100;
            font-display: swap;
          }
          @font-face {
            font-family: "Rawest";
            src: url('/fonts/Rawest-Medium.woff2') format('woff2');
            font-weight: 500;
            font-display: swap;
          }
          @font-face {
            font-family: "Rawest";
            src: url('/fonts/Rawest-SemiBold.woff2') format('woff2');
            font-weight: 600;
            font-display: swap;
          }
          @font-face {
            font-family: "Rawest";
            src: url('/fonts/Rawest-Bold.woff2') format('woff2');
            font-weight: 700;
            font-display: swap;
          }
          @font-face {
            font-family: "DM Sans";
            src: url('/fonts/DMSans-Regular.woff2') format('woff2');
            font-weight: 400;
            font-display: swap;
          }
          @font-face {
            font-family: "DM Sans";
            src: url('/fonts/DMSans-Light.woff2') format('woff2');
            font-weight: 300;
            font-display: swap;
          }
          @font-face {
            font-family: "DM Sans";
            src: url('/fonts/DMSans-ExtraLight.woff2') format('woff2');
            font-weight: 200;
            font-display: swap;
          }
          @font-face {
            font-family: "DM Sans";
            src: url('/fonts/DMSans-Thin.woff2') format('woff2');
            font-weight: 100;
            font-display: swap;
          }
          @font-face {
            font-family: "DM Sans";
            src: url('/fonts/DMSans-Medium.woff2') format('woff2');
            font-weight: 500;
            font-display: swap;
          }
          @font-face {
            font-family: "DM Sans";
            src: url('/fonts/DMSans-SemiBold.woff2') format('woff2');
            font-weight: 600;
            font-display: swap;
          }
          @font-face {
            font-family: "DM Sans";
            src: url('/fonts/DMSans-ExtraBold.woff2') format('woff2');
            font-weight: 800;
            font-display: swap;
          }
          @font-face {
            font-family: "DM Sans";
            src: url('/fonts/DMSans-Bold.woff2') format('woff2');
            font-weight: 700;
            font-display: swap;
          }
        `}} />
      </head>
      <body className="body" style={{
        WebkitFontSmoothing: 'antialiased',
        MozFontSmoothing: 'antialiased',
        OFontSmoothing: 'antialiased',
      }}>
        {children}
      </body>
    </html>
  )
}
