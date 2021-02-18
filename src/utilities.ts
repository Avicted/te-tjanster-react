// The TE API expects the location to have a capitalized first character with the rest of the name in lowercase
// Example: Helsinki is valid, helsinki is invalid.
export function capitalizeFirstCharacterInString(inputString: string): string {
    inputString = inputString.toLowerCase()
    return inputString.charAt(0).toUpperCase() + inputString.slice(1)
}
