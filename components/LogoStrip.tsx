import Image from "next/image";

const logos = [
    { src: "/logos/forbes.svg", alt: "Forbes" },
    { src: "/logos/producthunt.svg", alt: "Product Hunt" },
    { src: "/logos/pod.svg", alt: "Podcast" },
    // add / replace as needed
];

export default function LogoStrip() {
    return (
        <div className="py-8 overflow-x-hidden">
            <div className="flex animate-marquee whitespace-nowrap gap-12">
                {logos.map((l) => (
                    <Image key={l.alt} src={l.src} alt={l.alt} width={120} height={60} />
                ))}
            </div>
        </div>
    );
} 