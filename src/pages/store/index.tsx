import { ChevronRight } from "lucide-react"

import { Link, useParams } from "react-router"

import RestaurantSkeleton from "@/components/ui/Feedback/retaurant-skeleton"
import HeroCard from "@/components/ui/restaurant/hero-card"

import hero from "@/assets/images/burger-imge.webp"
import welcomeImage from "@/assets/images/resturant.webp"
import ChoosingBranchForm from "@/components/forms/store-menu/choose-branch"
import NotFoundPage from "@/pages/not-found"
import { useStore } from "@/queries/store-menu"

export default function StorePage() {
    const { slug } = useParams()

    const { data, isLoading } = useStore(slug as string)

    if (isLoading) return <RestaurantSkeleton />

    if (!data) return <NotFoundPage />

    return (
        <>
            <div className="relative  w-full shrink-0">
                <Link
                    to={`#`}
                    className="absolute top-4 right-4 md:top-6 md:right-6 z-10 rounded-lg py-2.5 px-3 bg-white "
                    aria-label="Back to menu"
                >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6 " />
                </Link>

                <div className="w-full overflow-hidden h-[161px] sm:h-64 md:h-96 lg:h-[500px]">
                    <img
                        src={data?.organization?.cover_image ?? hero}
                        alt="Restaurant Hero"
                        className="w-full h-full object-cover"
                    />
                </div>

                <HeroCard
                    title={data?.organization?.name ?? ""}
                    description={data?.organization?.slogan ?? ""}
                    image={data?.organization?.cover_image}
                />
            </div>

            <div className="container flex flex-col items-center px-4">
                <img
                    src={welcomeImage}
                    loading="lazy"
                    alt="welcome"
                    className="mt-[73px] max-w-full h-auto object-cover"
                />
                <p className="font-medium text-center mt-4 text-gray-700 max-w-2xl px-4">
                    اطلب الآن من طاولتك بدون انتظار، تجربة سريعة وسلسة بضغطة واحدة.
                </p>
            </div>

            <ChoosingBranchForm slug={slug as string} branches={data?.branches} />
        </>
    )
}
