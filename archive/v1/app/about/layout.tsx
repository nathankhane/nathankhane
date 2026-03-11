import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About: Khane Creative",
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
} 