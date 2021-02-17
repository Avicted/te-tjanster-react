import { Action } from 'redux'
import { Job } from '../../../entities/Job'
import { JobDetails } from '../../../entities/jobDetails'
import { Language } from '../../../enums/language'

export enum JobSearchActionTypes {
    SearchJobs = 'JobSearch/SearchJobs',
    SearchJobsSuccess = 'JobSearch/SearchJobsSuccess',
    SearchJobsError = 'JobSearch/SearchJobsError',
    GetJobDetails = 'JobSearch/GetJobDetails',
    GetJobDetailsSuccess = 'JobSearch/GetJobSuccess',
    GetJobDetailsError = 'JobSearch/GetJobDetailsError',
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
}

export type JobActions =
    | SearchJobs
    | SearchJobsSuccess
    | SearchJobsError
    | GetJobDetails
    | GetJobDetailsSuccess
    | GetJobDetailsError

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
