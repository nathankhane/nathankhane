import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quotes – Nathan Khane",
  description: "Inspirational quotes and insights on business, growth, and life philosophy.",
};

export default function QuotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}