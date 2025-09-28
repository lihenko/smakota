import {Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from './components/Header';
import Footer from './components/Footer';
import Script from "next/script";


const geistRoboto = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["cyrillic", "latin"],
});

export const metadata: Metadata ={
  title: 'Смакота – Кращі домашні рецепти',
  description: 'Готуйте смачно з нашими перевіреними рецептами!',
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

      <html lang="uk" data-theme="caramellatte">
        <body className={`${geistRoboto.variable} antialiased`}>
          {/* Google Analytics */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-C6H7790DT6"
          />
          <Script id="google-analytics">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-C6H7790DT6');
            `}
          </Script>
          <Header />
          {children}
          <Footer />
        </body>
      </html>

  );
}