import type { PropsWithChildren } from "react";

type CardProps = PropsWithChildren<{ className?: string }>;

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={`bg-cyan-400 rounded-lg shadow-2xl text-white h-full ${className}`}
    >
      {children}
    </div>
  );
}

Card.Header = function CardHeader({ children, className }: CardProps) {
  return <div className={`p-2 border-b-2 ${className}`}>{children}</div>;
};

Card.Footer = function CardFooter({ children, className }: CardProps) {
  return <div className={`p-2 border-t-2 ${className}`}>{children}</div>;
};
