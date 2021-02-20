import { Language } from '../enums/language'

export interface JobSearchParameters {
    // @Note: "language" might become a bug, if the user changes the app language
    // while they scroll down to discover more job results
    language: Language
    query: string
    location: string
    start: number
    appendJobsToPreviousJobs: boolean
}
