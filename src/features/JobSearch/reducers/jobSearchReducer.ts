import produce from 'immer'
import { Job } from '../../../entities/Job'
import { JobDetails } from '../../../entities/jobDetails'
import { JobSearchParameters } from '../../../entities/jobSearchParameters'
import { Locations } from '../../../entities/locations'
import { AppState } from '../../../framework/store/rootReducer'
import { JobActions, JobSearchActionTypes } from '../actions/jobSearchAction'

// State definition
interface JobSearchState {
    jobsFound: Job[] | undefined
    totalAmountOfJobs: number | undefined
    loadingData: boolean
    jobSearchParameters: JobSearchParameters | undefined
    loadingDataError: boolean
    jobSearchError: string | undefined
    jobDetails: JobDetails | undefined
    loadingJobDetails: boolean
    loadingJobDetailsError: string | undefined
    locations: Locations | undefined
    loadingLocations: boolean
    loadingLocationsError: string | undefined
}

const initialState: JobSearchState = {
    jobsFound: undefined,
    totalAmountOfJobs: undefined,
    loadingData: false,
    jobSearchParameters: undefined,
    loadingDataError: false,
    jobSearchError: undefined,
    jobDetails: undefined,
    loadingJobDetails: false,
    loadingJobDetailsError: undefined,
    locations: undefined,
    loadingLocations: false,
    loadingLocationsError: undefined,
}

export function jobSearchReducer(state: JobSearchState = initialState, action: JobActions) {
    switch (action.type) {
        // When a particular event takes place, how should the state chage?
        // (draft) => think of it as an unsaved document of the state => "produce" is the function that saves the document
        case JobSearchActionTypes.SearchJobs:
            return produce(state, (draft) => {
                draft.loadingData = true
                draft.jobSearchError = undefined
                draft.loadingDataError = false
                if (draft.jobSearchParameters !== undefined) {
                    draft.jobSearchParameters.appendJobsToPreviousJobs = action.appendJobsToPreviousJobs
                }
            })
        case JobSearchActionTypes.SearchJobsSuccess:
            return produce(state, (draft) => {
                if (action.appendJobsToPreviousJobs) {
                    draft.jobsFound?.push(...action.jobs)
                } else {
                    draft.jobsFound = action.jobs
                }
                draft.totalAmountOfJobs = action.totalAmountOfJobs
                draft.loadingData = false
                draft.jobSearchParameters = action.jobSearchParameters
            })
        case JobSearchActionTypes.SearchJobsError:
            return produce(state, (draft) => {
                draft.jobSearchError = action.error
                draft.loadingDataError = true
                draft.loadingData = false
            })
        case JobSearchActionTypes.GetJobDetails:
            return produce(state, (draft) => {
                draft.loadingDataError = false
                draft.loadingJobDetails = true
            })

        case JobSearchActionTypes.GetJobDetailsSuccess:
            return produce(state, (draft) => {
                draft.loadingJobDetailsError = undefined
                draft.loadingJobDetails = false
                draft.jobDetails = action.jobDetails
            })
        case JobSearchActionTypes.GetJobDetailsError:
            return produce(state, (draft) => {
                draft.loadingJobDetails = false
                draft.loadingJobDetailsError = action.error
                draft.jobDetails = undefined
            })
        case JobSearchActionTypes.GetLocations:
            return produce(state, (draft) => {
                draft.loadingLocations = true
                draft.loadingLocationsError = undefined
            })
        case JobSearchActionTypes.GetLocationsSuccess:
            return produce(state, (draft) => {
                draft.locations = action.locations
                draft.loadingLocations = false
                draft.loadingLocationsError = undefined
            })
        case JobSearchActionTypes.GetLocationsError:
            return produce(state, (draft) => {
                draft.locations = undefined
                draft.loadingLocations = false
                draft.loadingLocationsError = action.error
            })
        default:
            return state
    }
}

// Getters for the state
export function getJobsFound(state: AppState): any[] | undefined {
    return state.jobSearch.jobsFound
}

export function getTotalAmountOfJobs(state: AppState): number | undefined {
    return state.jobSearch.totalAmountOfJobs
}

export function getLoadingData(state: AppState): boolean {
    return state.jobSearch.loadingData
}

export function getJobSearchParameters(state: AppState): JobSearchParameters | undefined {
    return state.jobSearch.jobSearchParameters
}

export function getLoadingDataError(state: AppState): boolean {
    return state.jobSearch.loadingDataError
}

export function getJobSearchError(state: AppState): string | undefined {
    return state.jobSearch.jobSearchError
}

// @TOOD: should the job details be located in a separated reducer + actions?
export function getJobDetails(state: AppState): JobDetails | undefined {
    return state.jobSearch.jobDetails
}

export function getLoadingJobDetails(state: AppState): boolean {
    return state.jobSearch.loadingJobDetails
}

export function getLoadingJobDetailsError(state: AppState): string | undefined {
    return state.jobSearch.loadingJobDetailsError
}

// @TODO: should the locations be located lol in a separate reducer + actions?
export function getLocations(state: AppState): Locations | undefined {
    return state.jobSearch.locations
}

export function getLoadingLocations(state: AppState): boolean {
    return state.jobSearch.loadingLocations
}

export function getLoadingLocationsError(state: AppState): string | undefined {
    return state.jobSearch.loadingLocationsError
}
