import { icons } from './Icon';

type IconKey = keyof typeof icons;

export default function ServiceIcon({
    name,
    className = '',
}: {
    name: IconKey;
    className?: string;
}) {
    const Icon = icons[name];
    return (
        <div
            className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary ${className}`}
            aria-hidden="true"
        >
            <Icon className="h-6 w-6" />
        </div>
    );
} 