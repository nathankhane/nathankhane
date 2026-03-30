import type { Metadata } from "next";
import ResumeContent from "./ResumeContent";

export const metadata: Metadata = {
  title: "The Record — Nathan Khane Morales",
  description:
    "Producer. Video storyteller. Creative technologist. The structured credentials behind nathankhane.com.",
  openGraph: {
    title: "The Record — Nathan Khane Morales",
    description: "Producer. Video storyteller. Creative technologist.",
    url: "https://nathankhane.com/resume",
  },
};

export default function ResumePage() {
  return <ResumeContent />;
}
