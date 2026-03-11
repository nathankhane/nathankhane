import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quotes: Khane Creative",
};

export default function QuotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}