import "./globals.css";
import { Open_Sans } from "next/font/google";
import Header from "./layouts/header";
import Footer from "./layouts/footer";

const inter = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "SimpleCommerce",
  description: "A simple ecommerce",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
