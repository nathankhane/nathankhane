import Image from "next/image";

interface KPI { label: string; value: string; }
interface Props {
    title: string;
    description: string;
    image: string;
    kpis?: KPI[];
    link?: string;
}

export default function CaseStudyCard({ title, description, image, kpis, link }: Props) {
    const content = (
        <>
            <Image src={image} alt={title} width={800} height={450} className="w-full" />
            <div className="p-6 space-y-4">
                <h3 className="text-2xl font-semibold">{title}</h3>
                <p>{description}</p>
                {kpis && (
                    <ul className="grid grid-cols-2 gap-4 pt-4">
                        {kpis.map(({ label, value }) => (
                            <li key={label}>
                                <p className="text-sm opacity-70">{label}</p>
                                <p className="text-lg font-bold">{value}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );

    if (link) {
        return (
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="block border rounded-xl overflow-hidden hover:shadow-lg transition cursor-pointer"
            >
                {content}
            </a>
        );
    }

    return (
        <div className="border rounded-xl overflow-hidden hover:shadow-lg transition">
            {content}
        </div>
    );
} 