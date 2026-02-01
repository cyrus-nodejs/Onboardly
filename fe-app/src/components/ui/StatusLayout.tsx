import { ReactNode } from "react";

interface StatusLayoutProps {
  children: ReactNode;
  className?: string;
}

export function StatusLayout({ children, className = "" }: StatusLayoutProps) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-4 text-center ${className}`}
    >
      <div className="flex flex-col items-center gap-4 animate-in fade-in duration-500">
        {children}
      </div>
    </main>
  );
}
