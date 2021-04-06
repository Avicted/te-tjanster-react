// The TE API expects the location to have a capitalized first character with the rest of the name in lowercase

import { Theme } from '../enums/theme'

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

export function changeTheme(theme?: Theme): void {
    if (localStorage.theme === 'dark' || !('theme' in localStorage)) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }

    if (theme === undefined) {
        return
    }

    if (Theme[theme] === Theme.light) {
        // Whenever the user explicitly chooses light mode
        localStorage.theme = 'light'
    } else if (Theme[theme] === Theme.dark) {
        // Whenever the user explicitly chooses dark mode
        localStorage.theme = 'dark'
    }
}

export function getActiveTheme(): Theme | undefined {
    return Theme[localStorage.theme as keyof typeof Theme]
}
