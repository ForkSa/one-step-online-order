import Hero from "@/components/hero"
import RestaurantList from "@/components/restaurant/list"

export default function CategoriesSection() {
    return (
        <section>
            <Hero />
            <RestaurantList className="mt-6" />
        </section>
    )
}
