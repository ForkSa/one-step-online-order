import { type LoaderFunction, redirect } from "react-router"

import { entryContextToStoreInfo } from "@/lib/entry-context"

import { getEntryContext } from "@/apis/entry-context"
import { getStore } from "@/apis/store"
import { jotaiStore, storeInfoAtom } from "@/atoms"

export const clientLoader: LoaderFunction = async ({ params, request }) => {
    try {
        const { slug } = params
        const url = new URL(request.url)
        const qr = url.searchParams.get("qr")
        const branchQr = url.searchParams.get("branch_qr")

        if (qr || branchQr) {
            const response = await getEntryContext(slug as string, {
                qr: qr ?? undefined,
                branch_qr: branchQr ?? undefined,
            })

            const entry = response?.data

            if (!entry) return redirect("/not-found")

            jotaiStore.set(
                storeInfoAtom,
                entryContextToStoreInfo(entry, slug as string, {
                    qr: qr ?? undefined,
                    branch_qr: branchQr ?? undefined,
                })
            )

            return redirect(`/restaurant/${slug}/items`)
        }

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
