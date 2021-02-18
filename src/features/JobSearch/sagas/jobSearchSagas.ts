import {
    GetJobDetails,
    GetLocations,
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

const TeApi = new TEApi()

// Watcher saga
export function* searchJobsSaga() {
    yield takeLatest(JobSearchActionTypes.SearchJobs, loadJobsFlow)
}

// Worker saga
function* loadJobsFlow(action: SearchJobs) {
    try {
        const { language, query, location } = action
        const data: ApiResponse = yield call(TeApi.searchJob, language, query, location)

        console.log('loadJobsFlow')
        console.log(data)
        if (data.response?.docs) {
            yield put(jobSearchActions.SearchJobsSuccess(data.response?.docs as Job[]))
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

        console.log('loadJobDetailsFlow')
        console.log(data)
        console.log(data.response?.docs[0])
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
