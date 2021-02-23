// The TE API expects the location to have a capitalized first character with the rest of the name in lowercase
// Example: Helsinki is valid, helsinki is invalid.
export function capitalizeFirstCharacterInString(inputString: string): string {
    // @Note: example mäntä-hilppula => Mäntä-Hilppula
    if (inputString.includes('-')) {
        const stringParts: string[] = inputString.split('-')
        let result: string = ''

        stringParts.forEach((part) => {
            part = part.toLowerCase()
            result += `${part.charAt(0).toUpperCase()}${part.slice(1)}-`
        })

        return result.slice(0, -1)
    }

    inputString = inputString.toLowerCase()
    return inputString.charAt(0).toUpperCase() + inputString.slice(1)
}
