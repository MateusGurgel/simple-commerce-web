import { ReactNode } from "react";

interface BodyProps {
  children: ReactNode;
}

export default function Body({ children }: BodyProps) {
  const headerHeigth = "48px";

  return (
    <main style={{ minHeight: `calc(100vh - ${headerHeigth})` }}>
      {children}
    </main>
  );
}
