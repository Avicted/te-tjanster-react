import { Language } from '../enums/language'

export interface JobSearchParameters {
    language: Language
    query: string
    location: string
    start: number
    appendJobsToPreviousJobs: boolean
    professionsChecked?: string[]
}
