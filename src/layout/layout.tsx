import { ReactNode } from "react";
import Header from "./header";
import Footer from "./footer";
import Body from "./body";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <Body>{children}</Body>
      <Footer />
    </>
  );
}
