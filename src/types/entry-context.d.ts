type EntryContextSource = "table" | "branch"

type EntryContextBranch = {
    id: number
    name: LocalizedName
    name_txt: string
    address: string
}

type EntryContextTable = {
    id: number
    table_number: string
}

type EntryContextOrganization = {
    name: string
    slug: string
    logo: string
}

type EntryContextData = {
    source: EntryContextSource
    organization: EntryContextOrganization
    branch: EntryContextBranch
    order_type: string
    available_order_types: string[] | null
    table?: EntryContextTable
}

type EntryContextParams = {
    qr?: string
    branch_qr?: string
}
