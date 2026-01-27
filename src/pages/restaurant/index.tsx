import { Suspense, lazy } from "react"
import { useLoaderData, useParams } from "react-router"

import welcomeImage from "@/assets/images/restaurant.webp"
import { ChooseBranchFormSkeleton } from "@/components/forms/restaurant-menu/choose-branch"
import RestaurantHero from "@/components/restaurant/hero"

const ChoosingBranchForm = lazy(() => import("@/components/forms/restaurant-menu/choose-branch"))

export default function RestaurantPage() {
    const { slug } = useParams()
    const loaderData = useLoaderData() as RestaurantMenu | undefined

    return (
        <main>
            {loaderData && <RestaurantHero restaurant={loaderData} backTo="/" />}

            <div className="flex flex-col items-center gap-y-4 px-6 mt-10 ">
                <img src={welcomeImage} loading="lazy" alt="welcome" className="size-40 object-cover" />
                <p className="font-medium text-sm text-center text-gray-700">
                    اطلب الآن من طاولتك بدون انتظار، تجربة سريعة وسلسة بضغطة واحدة.
                </p>
            </div>

            {loaderData && (
                <Suspense fallback={<ChooseBranchFormSkeleton />}>
                    <ChoosingBranchForm slug={slug as string} branches={loaderData?.branches ?? []} />
                </Suspense>
            )}
        </main>
    )
}
