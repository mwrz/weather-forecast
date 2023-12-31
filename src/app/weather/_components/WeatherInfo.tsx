import Image from 'next/image';

interface WeathefInfoProps {
    icon: string;
    alt: string;
    info: string;
}

export const WeatherInfo = ({ icon, alt, info }: WeathefInfoProps) => {
    return (
        <section className="flex items-center justify-center gap-x-2">
            <Image
                src={icon}
                alt={alt}
                width={20}
                height={20}
            />
            <p>{info}</p>
        </section>
    );
};