import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from './components/Header';
import Footer from './components/Footer';


const geistRoboto = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["cyrillic", "latin"],
});

export const metadata = {
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
          <Header />
          {children}
          <Footer />
        </body>
      </html>

  );
}