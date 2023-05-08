import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { Open_Sans } from "next/font/google";
import "./globals.css";

import Header from "./layouts/header";
import Footer from "./layouts/footer";
import { Providers } from "./providers";

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
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
