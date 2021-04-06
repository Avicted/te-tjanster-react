import {
    GetJobDetails,
    GetLocations,
    GetProfessions,
    jobSearchActions,
    JobSearchActionTypes,
    SearchJobs,
} from '../actions/jobSearchAction'
import { call, put, takeLatest } from 'redux-saga/effects'
import { TEApi } from '../../../api/teApi'
import { Job } from '../../../entities/Job'
import { ApiResponse } from '../../../entities/apiResponse'
import { JobDetails } from '../../../entities/jobDetails'
import { Locations } from '../../../entities/locations'
import { JobSearchParameters } from '../../../entities/jobSearchParameters'
import { JOBS_PER_SEARCH_QUERY } from '../../../constants'
import { Profession } from '../../../entities/profession'

const TeApi = new TEApi()

// Watcher saga
export function* searchJobsSaga() {
    yield takeLatest(JobSearchActionTypes.SearchJobs, loadJobsFlow)
}

// Worker saga
function* loadJobsFlow(action: SearchJobs) {
    try {
        const { language, query, location, start, appendJobsToPreviousJobs, professionsChecked } = action
        const data: ApiResponse = yield call(
            TeApi.searchJob,
            language,
            query,
            location,
            start,
            appendJobsToPreviousJobs,
            professionsChecked
        )

        if (data.response?.docs) {
            const jobSearchParameters: JobSearchParameters = {
                language,
                location,
                query,
                start: start + JOBS_PER_SEARCH_QUERY,
                appendJobsToPreviousJobs,
            }

            yield put(
                jobSearchActions.SearchJobsSuccess(
                    data.response?.docs as Job[],
                    data.response.numFound,
                    action.appendJobsToPreviousJobs,
                    jobSearchParameters
                )
            )
        }
    } catch (error) {
        yield put(jobSearchActions.SearchJobsError(error))
    }
}

// Watcher saga
export function* getJobDetailsSaga() {
    yield takeLatest(JobSearchActionTypes.GetJobDetails, loadJobDetailsFlow)
}

// Worker saga
function* loadJobDetailsFlow(action: GetJobDetails) {
    try {
        const { id, language } = action
        const data: ApiResponse = yield call(TeApi.getJobDetails, id, language)

        if (data.response?.docs[0]) {
            yield put(jobSearchActions.GetJobDetailsSuccess(data.response?.docs[0] as JobDetails))
        }
    } catch (error) {
        yield put(jobSearchActions.GetJobDetailsError(error))
    }
}

// Watcher saga
export function* getLocationsSaga() {
    yield takeLatest(JobSearchActionTypes.GetLocations, loadLocationsFlow)
}

// Worker saga
function* loadLocationsFlow(action: GetLocations) {
    try {
        const { language } = action
        const data: Locations | undefined = yield call(TeApi.getLocations, language)

        if (data !== undefined) {
            yield put(jobSearchActions.GetLocationsSuccess(data))
        }
    } catch (error) {
        yield put(jobSearchActions.GetLocationsError(error))
    }
}

// Watcher saga
export function* getProfessionsSaga() {
    yield takeLatest(JobSearchActionTypes.GetProfessions, loadProfessionsFlow)
}

// Worker saga
function* loadProfessionsFlow(action: GetProfessions) {
    try {
        const { language } = action
        const data: ApiResponse | undefined = yield call(TeApi.getProfessions, language)

        if (data !== undefined) {
            yield put(jobSearchActions.GetProfessionsSuccess(data.response?.docs as Profession[]))
        }
    } catch (error) {
        yield put(jobSearchActions.GetProfessionsError(error))
    }
}
