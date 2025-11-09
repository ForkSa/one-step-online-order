export interface Restaurant {
    id: string
    name: string
    image: string
    price: string
    description: string
    menu?: MenuItem[]
    branches?: Branch[]
}

export interface MenuItem {
    id: number
    name: string
    price: number
    category: string
    description: string
    image: string
    differents: DifferentOption[]
    addons: Addon[]
}

export interface DifferentOption {
    id: number
    name: string
    price: number
}

export interface Addon {
    id: number
    name: string
    price: number
}

export interface Branch {
    id: number
    name: string
    address: string
    phone: string
}


