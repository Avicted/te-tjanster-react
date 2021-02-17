import produce from 'immer'
import { Job } from '../../../entities/Job'
import { JobDetails } from '../../../entities/jobDetails'
import { AppState } from '../../../framework/store/rootReducer'
import { JobActions, JobSearchActionTypes } from '../actions/jobSearchAction'

interface JobSearchState {
    jobsFound: Job[] | undefined
    loadingData: boolean
    loadingDataError: boolean
    error: string | undefined
    jobDetails: JobDetails | undefined
    loadingJobDetails: boolean
    loadingJobDetailsError: string | undefined
}

const initialState: JobSearchState = {
    jobsFound: undefined,
    loadingData: false,
    loadingDataError: false,
    error: undefined,
    jobDetails: undefined,
    loadingJobDetails: false,
    loadingJobDetailsError: undefined,
}

export function jobSearchReducer(state: JobSearchState = initialState, action: JobActions) {
    switch (action.type) {
        case JobSearchActionTypes.SearchJobs:
            return produce(state, (draft) => {
                draft.loadingData = true
                draft.error = undefined
                draft.loadingDataError = false
            })
        case JobSearchActionTypes.SearchJobsSuccess:
            return produce(state, (draft) => {
                draft.jobsFound = action.jobs
                draft.loadingData = false
            })
        case JobSearchActionTypes.SearchJobsError:
            return produce(state, (draft) => {
                draft.error = action.error
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
        default:
            return state
    }
}

export function getJobsFound(state: AppState): any[] | undefined {
    return state.jobSearch.jobsFound
}

export function getLoadingData(state: AppState): boolean {
    return state.jobSearch.loadingData
}

export function getLoadingDataError(state: AppState): boolean {
    return state.jobSearch.loadingDataError
}

export function getError(state: AppState): string | undefined {
    return state.jobSearch.error
}

export function getJobDetails(state: AppState): JobDetails | undefined {
    return state.jobSearch.jobDetails
}

export function getLoadingJobDetails(state: AppState): boolean {
    return state.jobSearch.loadingJobDetails
}

export function getLoadingJobDetailsError(state: AppState): string | undefined {
    return state.jobSearch.loadingJobDetailsError
}
