import { type LoaderFunction, redirect } from "react-router"

import { getStore } from "@/apis/store"
import { jotaiStore, storeInfoAtom } from "@/atoms"

export const clientLoader: LoaderFunction = async ({ params }) => {
    try {
        const { slug } = params

        const response = await getStore(slug as string)
        const data = response?.data

        if (!data) return redirect("/not-found")

        const branches = data?.branches ?? []

        if (branches?.length === 1) {
            const branch = branches[0]

            jotaiStore.set(storeInfoAtom, {
                branch: {
                    id: branch.id.toString(),
                    name: branch.name?.ar ?? "",
                },
                slug,
            })

            return redirect(`/restaurant/${slug}/items`)
        }

        return data
    } catch {
        return redirect("/not-found")
    }
}
