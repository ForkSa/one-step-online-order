const SESSION_KEY = "orderingSessionId"

export const getOrCreateSessionId = (): string => {
    const existing = localStorage.getItem(SESSION_KEY)

    if (existing) return existing

    const sessionId = crypto.randomUUID()
    localStorage.setItem(SESSION_KEY, sessionId)

    return sessionId
}

export const setSessionId = (sessionId: string) => {
    localStorage.setItem(SESSION_KEY, sessionId)
}

export const clearSessionId = () => {
    localStorage.removeItem(SESSION_KEY)
}
