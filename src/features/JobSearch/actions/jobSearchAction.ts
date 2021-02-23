import { Action } from 'redux'
import { Job } from '../../../entities/Job'
import { JobDetails } from '../../../entities/jobDetails'
import { JobSearchParameters } from '../../../entities/jobSearchParameters'
import { Locations } from '../../../entities/locations'
import { Profession } from '../../../entities/profession'
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
    ShowFilterDialog = 'JobSearch/ShowFilterDialog',
    HideFilterDialog = 'JobSearch/HideFilterDialog',
    GetProfessions = 'JobSearch/GetProfessions',
    GetProfessionsSuccess = 'JobSearch/GetProfessionsSuccess',
    GetProfessionsError = 'JobSearch/GetProfessionsError',
    ProfessionChecked = 'JobSearch/ProfessionChecked',
    ProfessionUnchecked = 'JobSearch/ProfessionUnchecked',
    ClearProfessionsChecked = 'JobSearch/ClearProfessionsChecked',
}

export interface SearchJobs extends Action, JobSearchParameters {
    type: JobSearchActionTypes.SearchJobs
}

export interface SearchJobsSuccess extends Action {
    type: JobSearchActionTypes.SearchJobsSuccess
    jobs: Job[]
    totalAmountOfJobs: number | undefined
    appendJobsToPreviousJobs: boolean
    jobSearchParameters: JobSearchParameters
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

export interface ShowFilterDialog extends Action {
    type: JobSearchActionTypes.ShowFilterDialog
}

export interface HideFilterDialog extends Action {
    type: JobSearchActionTypes.HideFilterDialog
}

export interface GetProfessions extends Action {
    type: JobSearchActionTypes.GetProfessions
    language: Language
}

export interface GetProfessionsSuccess extends Action {
    type: JobSearchActionTypes.GetProfessionsSuccess
    professions: Profession[]
}

export interface GetProfessionsError extends Action {
    type: JobSearchActionTypes.GetProfessionsError
    error: string
}

export interface ProfessionChecked extends Action {
    type: JobSearchActionTypes.ProfessionChecked
    professionId: string
}

export interface ProfessionUnchecked extends Action {
    type: JobSearchActionTypes.ProfessionUnchecked
    professionId: string
}

export interface ClearProfessionsChecked extends Action {
    type: JobSearchActionTypes.ClearProfessionsChecked
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
    SearchJobs: (
        language: Language,
        query: string,
        location: string,
        appendJobsToPreviousJobs: boolean,
        start: number,
        professionsChecked?: string[]
    ): SearchJobs => ({
        type: JobSearchActionTypes.SearchJobs,
        language,
        query,
        location,
        appendJobsToPreviousJobs,
        start,
        professionsChecked,
    }),
    SearchJobsSuccess: (
        jobs: Job[],
        totalAmountOfJobs: number | undefined,
        appendJobsToPreviousJobs: boolean,
        jobSearchParameters: JobSearchParameters
    ): SearchJobsSuccess => ({
        type: JobSearchActionTypes.SearchJobsSuccess,
        jobs,
        totalAmountOfJobs,
        appendJobsToPreviousJobs,
        jobSearchParameters,
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
    ShowFilterDialog: (): ShowFilterDialog => ({
        type: JobSearchActionTypes.ShowFilterDialog,
    }),
    HideFilterDialog: (): HideFilterDialog => ({
        type: JobSearchActionTypes.HideFilterDialog,
    }),
    GetProfessions: (language: Language): GetProfessions => ({
        type: JobSearchActionTypes.GetProfessions,
        language,
    }),
    GetProfessionsSuccess: (professions: Profession[]): GetProfessionsSuccess => ({
        type: JobSearchActionTypes.GetProfessionsSuccess,
        professions,
    }),
    GetProfessionsError: (error: string): GetProfessionsError => ({
        type: JobSearchActionTypes.GetProfessionsError,
        error,
    }),
    ProfessionChecked: (professionId: string): ProfessionChecked => ({
        type: JobSearchActionTypes.ProfessionChecked,
        professionId,
    }),
    ProfessionUnchecked: (professionId: string): ProfessionUnchecked => ({
        type: JobSearchActionTypes.ProfessionUnchecked,
        professionId,
    }),
    ClearProfessionsChecked: (): ClearProfessionsChecked => ({
        type: JobSearchActionTypes.ClearProfessionsChecked,
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
    | ShowFilterDialog
    | HideFilterDialog
    | GetProfessions
    | GetProfessionsSuccess
    | GetProfessionsError
    | ProfessionChecked
    | ProfessionUnchecked
    | ClearProfessionsChecked
