interface RestaurantMenu {
    organization: Organization
    branches: Branch[]
    auto_selected_branch: Branch | null
}

interface Organization {
    name: string
    slogan: string | null
    address: string
    city: string
    state: string
    logo: string
    cover_image: string
    slug: string
}

interface Branch {
    id: number
    name: LocalizedName
    address: string
    web_ordering_enabled: number // could be boolean if backend supports it
}

interface LocalizedName {
    ar: string
    en: string
}

type RestaurantType = {
    id: string
    name: string
    logo: string
    cover_image: string
    slug: string
    menu_url: string
}
