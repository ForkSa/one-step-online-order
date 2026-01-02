interface HeroCardProps {
    title: string
    description: string
    image: string
}

export default function HeroCard({ title, description, image }: HeroCardProps) {
    return (
        <div className="container absolute left-1/2 -translate-x-1/2  z-3  -bottom-12  md:-bottom-13">
            <div className="rounded-2xl flex gap-2 bg-white items-center border border-gray-border p-4 ">
                <img
                    src={image}
                    loading="lazy"
                    alt="restaurant"
                    className="border  shrink-0 border-gray-300  size-[71px] sm:size-16 md:size-20 rounded-full object-cover"
                />
                <div>
                    <h3 className="text-gray-700  text-lg font-semibold">{title}</h3>
                    <p className="text-gray-600">{description}</p>
                </div>
            </div>
        </div>
    )
}
