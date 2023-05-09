import { Open_Sans } from "next/font/google";
import "./globals.css";

import Header from "./layouts/header";
import Footer from "./layouts/footer";
import { Providers } from "./providers";
import Body from "./layouts/body";

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
          <Body>{children}</Body>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
