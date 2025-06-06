import Link from 'next/link';
import { motion } from 'framer-motion';
import ServiceIcon from './ServiceIcon';
import { icons } from './Icon';

interface Props {
    title: string;
    description: string;
    cta: string;
    href: string;
    icon: keyof typeof icons;
}

export default function ServiceCard({
    title,
    description,
    cta,
    href,
    icon,
}: Props) {
    return (
        <motion.article
            className="
        group flex flex-col rounded-2xl bg-card/60 border border-border/50 p-8 text-center
        transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10
        backdrop-blur-sm
      "
            whileHover={{
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" }
            }}
        >
            <ServiceIcon name={icon} className="mx-auto group-hover:scale-110 transition-transform duration-300" />

            <h3 className="mb-3 text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                {title}
            </h3>

            <p className="mb-6 text-sm leading-relaxed text-muted-foreground flex-grow">
                {description}
            </p>

            <Link
                href={href}
                aria-label={cta}
                className="
          inline-flex items-center justify-center gap-2 text-sm font-semibold
          text-primary transition-all duration-300 group-hover:text-primary/80
          hover:gap-3
        "
            >
                {cta}
                <icons.arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
        </motion.article>
    );
} 