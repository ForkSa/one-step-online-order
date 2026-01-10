import { Suspense, lazy } from "react"
import { useParams } from "react-router"

import welcomeImage from "@/assets/images/restaurant.webp"
import { ChooseBranchFormSkeleton } from "@/components/forms/restaurant-menu/choose-branch"
import RestaurantHero, { RestaurantHeroSkeleton } from "@/components/restaurant/hero"
import NotFoundPage from "@/pages/not-found"
import { useRestaurantMenu } from "@/queries/restaurant-menu"

const ChoosingBranchForm = lazy(() => import("@/components/forms/restaurant-menu/choose-branch"))

export default function RestaurantPage() {
    const { slug } = useParams()

    const { data, isLoading } = useRestaurantMenu(slug as string)

    if (!data && !isLoading) return <NotFoundPage />

    return (
        <main>
            {isLoading && <RestaurantHeroSkeleton />}
            {!isLoading && data && <RestaurantHero restaurant={data} backTo="#" />}

            <div className="flex flex-col items-center gap-y-4 px-6 mt-10 ">
                <img src={welcomeImage} loading="lazy" alt="welcome" className="size-40 object-cover" />
                <p className="font-medium text-sm text-center text-gray-700">
                    اطلب الآن من طاولتك بدون انتظار، تجربة سريعة وسلسة بضغطة واحدة.
                </p>
            </div>

            {isLoading && <ChooseBranchFormSkeleton />}
            {!isLoading && data && (
                <Suspense fallback={<ChooseBranchFormSkeleton />}>
                    <ChoosingBranchForm slug={slug as string} branches={data?.branches ?? []} />
                </Suspense>
            )}
        </main>
    )
}
