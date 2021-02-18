import { Action } from 'redux'
import { Job } from '../../../entities/Job'
import { JobDetails } from '../../../entities/jobDetails'
import { Locations } from '../../../entities/locations'
import { Language } from '../../../enums/language'

export enum JobSearchActionTypes {
    SearchJobs = 'JobSearch/SearchJobs',
    SearchJobsSuccess = 'JobSearch/SearchJobsSuccess',
    SearchJobsError = 'JobSearch/SearchJobsError',
    GetJobDetails = 'JobSearch/GetJobDetails',
    GetJobDetailsSuccess = 'JobSearch/GetJobSuccess',
    GetJobDetailsError = 'JobSearch/GetJobDetailsError',
    GetLocations = 'JobSearch/GetLocations',
    GetLocationsSuccess = 'JobSearch/GetLocationsSuccess',
    GetLocationsError = 'JobSearch/GetLocationsError',
}

export interface SearchJobs extends Action {
    type: JobSearchActionTypes.SearchJobs
    language: Language
    query: string
    location: string
}

export interface SearchJobsSuccess extends Action {
    type: JobSearchActionTypes.SearchJobsSuccess
    jobs: Job[]
}

export interface SearchJobsError extends Action {
    type: JobSearchActionTypes.SearchJobsError
    error: string
}

export interface GetJobDetails extends Action {
    type: JobSearchActionTypes.GetJobDetails
    id: string
    language: Language
}

export interface GetJobDetailsSuccess extends Action {
    type: JobSearchActionTypes.GetJobDetailsSuccess
    jobDetails: JobDetails | undefined
}

export interface GetJobDetailsError extends Action {
    type: JobSearchActionTypes.GetJobDetailsError
    error: string
}

export interface GetLocations extends Action {
    type: JobSearchActionTypes.GetLocations
    language: Language
}

export interface GetLocationsSuccess extends Action {
    type: JobSearchActionTypes.GetLocationsSuccess
    locations: Locations
}

export interface GetLocationsError extends Action {
    type: JobSearchActionTypes.GetLocationsError
    error: string
}

export const jobSearchActions = {
    GetJobDetails: (id: string, language: Language): GetJobDetails => ({
        type: JobSearchActionTypes.GetJobDetails,
        id,
        language,
    }),
    GetJobDetailsSuccess: (jobDetails: JobDetails): GetJobDetailsSuccess => ({
        type: JobSearchActionTypes.GetJobDetailsSuccess,
        jobDetails,
    }),
    GetJobDetailsError: (error: string): GetJobDetailsError => ({
        type: JobSearchActionTypes.GetJobDetailsError,
        error,
    }),
    SearchJobs: (language: Language, query: string, location: string): SearchJobs => ({
        type: JobSearchActionTypes.SearchJobs,
        language,
        query,
        location,
    }),
    SearchJobsSuccess: (jobs: Job[]): SearchJobsSuccess => ({
        type: JobSearchActionTypes.SearchJobsSuccess,
        jobs,
    }),
    SearchJobsError: (error: string): SearchJobsError => ({
        type: JobSearchActionTypes.SearchJobsError,
        error,
    }),
    GetLocations: (language: Language): GetLocations => ({
        type: JobSearchActionTypes.GetLocations,
        language,
    }),
    GetLocationsSuccess: (locations: Locations): GetLocationsSuccess => ({
        type: JobSearchActionTypes.GetLocationsSuccess,
        locations,
    }),
    GetLocationsError: (error: string): GetLocationsError => ({
        type: JobSearchActionTypes.GetLocationsError,
        error,
    }),
}

export type JobActions =
    | SearchJobs
    | SearchJobsSuccess
    | SearchJobsError
    | GetJobDetails
    | GetJobDetailsSuccess
    | GetJobDetailsError
    | GetLocations
    | GetLocationsSuccess
    | GetLocationsError

export function searchJobs(language: Language, query: string, location: string) {
    return {
        type: JobSearchActionTypes.SearchJobs,
        language,
        query,
        location,
    }
}

export function getJobDetails(jobId: number, language: Language) {
    return {
        type: JobSearchActionTypes.GetJobDetails,
        jobId,
        language,
    }
}

export function getLocations(language: Language) {
    return {
        type: JobSearchActionTypes.GetLocations,
        language,
    }
}
