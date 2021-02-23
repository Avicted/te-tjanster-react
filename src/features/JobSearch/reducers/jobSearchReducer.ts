import produce from 'immer'
import { Job } from '../../../entities/Job'
import { JobDetails } from '../../../entities/jobDetails'
import { JobSearchParameters } from '../../../entities/jobSearchParameters'
import { Locations } from '../../../entities/locations'
import { Profession } from '../../../entities/profession'
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
    showFilterDialog: boolean
    professions: Profession[] | undefined
    loadingProfessions: boolean
    loadingProfessionsError: string | undefined
    professionsChecked: string[]
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
    showFilterDialog: false,
    professions: undefined,
    loadingProfessions: false,
    loadingProfessionsError: undefined,
    professionsChecked: [],
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
        case JobSearchActionTypes.ShowFilterDialog:
            return produce(state, (draft) => {
                draft.showFilterDialog = true
            })
        case JobSearchActionTypes.HideFilterDialog:
            return produce(state, (draft) => {
                draft.showFilterDialog = false
            })
        case JobSearchActionTypes.GetProfessions:
            return produce(state, (draft) => {
                draft.loadingProfessions = true
                draft.loadingProfessionsError = undefined
            })
        case JobSearchActionTypes.GetProfessionsSuccess:
            return produce(state, (draft) => {
                draft.loadingProfessionsError = undefined
                draft.loadingProfessions = false
                draft.professions = action.professions
            })
        case JobSearchActionTypes.GetProfessionsError:
            return produce(state, (draft) => {
                draft.loadingProfessions = false
                draft.loadingProfessionsError = action.error
            })
        case JobSearchActionTypes.ProfessionChecked:
            return produce(state, (draft) => {
                // If the new professionId is the parent of any existing professionsChecked.
                // Replace the children from professionsChecked with action.professionId
                const children: string[] = draft.professionsChecked.filter((id: string) =>
                    id.startsWith(action.professionId)
                )

                if (children.length > 0) {
                    draft.professionsChecked = draft.professionsChecked.filter((id: string) => !children.includes(id))
                    draft.professionsChecked.push(action.professionId)
                } else {
                    draft.professionsChecked?.push(action.professionId)
                }
            })
        case JobSearchActionTypes.ProfessionUnchecked:
            return produce(state, (draft) => {
                draft.professionsChecked = draft.professionsChecked?.filter((id) => id !== action.professionId)
            })
        case JobSearchActionTypes.ClearProfessionsChecked:
            return produce(state, (draft) => {
                draft.professionsChecked = []
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

export function getShowFilterDialog(state: AppState): boolean {
    return state.jobSearch.showFilterDialog
}

export function getProfessions(state: AppState): Profession[] | undefined {
    return state.jobSearch.professions
}

export function getLoadingProfessions(state: AppState): boolean {
    return state.jobSearch.loadingProfessions
}

export function getLoadingProfessionsError(state: AppState): string | undefined {
    return state.jobSearch.loadingProfessionsError
}

export function getProfessionsChecked(state: AppState): string[] {
    return state.jobSearch.professionsChecked
}
