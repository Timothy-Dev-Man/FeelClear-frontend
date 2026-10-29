export function getApiErrorMessage(data, fallback = "The request could not be completed.") {
    const rawError = data?.errors ?? data?.error ?? data?.err
    let message = fallback

    if (Array.isArray(rawError)) {
        message = rawError.map((error) => error?.msg ?? error?.message).filter(Boolean).join(", ") || fallback
    } else if (typeof rawError === "string") {
        message = rawError
    } else if (rawError?.message) {
        message = rawError.message
    }

    if (/users_username_key/i.test(message)) {
        return "That username is already taken."
    }

    if (/duplicate key|unique constraint|sqlstate|database error/i.test(message)) {
        return "This information conflicts with an existing record."
    }

    return message
}

export async function readApiResponse(response) {
    const text = await response.text()
    let data = null

    if (text) {
        try {
            data = JSON.parse(text)
        } catch {
            if (response.ok) {
                throw new Error("The server returned an invalid response.")
            }
        }
    }

    if (!response.ok) {
        const statusMessage = {
            401: "Your session has expired. Please sign in again.",
            403: "You do not have permission to complete this request.",
            409: "This action conflicts with existing information.",
        }[response.status]
        const message = data
            ? getApiErrorMessage(data, statusMessage || "The request could not be completed.")
            : statusMessage || "The request could not be completed."
        const error = new Error(message)
        error.status = response.status
        throw error
    }

    return data ?? {}
}