import { getOrCreateSessionId } from "@/lib/ordering-session"

import type { StoreInfo } from "@/atoms"

export const buildQrPayload = (storeInfo: StoreInfo): { qr: string } | { branch_qr: string } => {
    if (storeInfo.qr) return { qr: storeInfo.qr }

    if (storeInfo.branch_qr) return { branch_qr: storeInfo.branch_qr }

    throw new Error("QR context is required")
}

export const entryContextToStoreInfo = (
    entry: EntryContextData,
    slug: string,
    tokens: EntryContextParams
): StoreInfo => ({
    slug: entry.organization.slug ?? slug,
    branch: {
        id: String(entry.branch.id),
        name: entry.branch.name_txt ?? entry.branch.name?.ar ?? "",
    },
    source: entry.source,
    qr: tokens.qr,
    branch_qr: tokens.branch_qr,
    order_type: entry.order_type,
    available_order_types: entry.available_order_types,
    table: entry.table,
    organization: {
        name: entry.organization.name,
        logo: entry.organization.logo,
    },
    session_id: getOrCreateSessionId(),
})

export const mergeEntryIntoStoreInfo = (storeInfo: StoreInfo, entry: EntryContextData): StoreInfo => ({
    ...storeInfo,
    slug: entry.organization.slug ?? storeInfo.slug,
    branch: {
        id: String(entry.branch.id),
        name: entry.branch.name_txt ?? entry.branch.name?.ar ?? storeInfo.branch?.name ?? "",
    },
    source: entry.source,
    order_type: entry.order_type,
    available_order_types: entry.available_order_types,
    table: entry.table,
    organization: {
        name: entry.organization.name,
        logo: entry.organization.logo,
    },
})
