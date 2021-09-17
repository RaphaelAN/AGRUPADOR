
export type Group = {
    name: string,
    lat: number,
    lon: number,
    category?: string,
    description?: string,
    whatsapp?: string,
    telegram?: string
}

export type GroupQuery = {
    lat: number,
    lon: number,
    radius: number,
    category?: string,
}
