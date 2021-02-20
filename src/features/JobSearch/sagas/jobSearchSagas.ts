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
import { JobSearchParameters } from '../../../entities/jobSearchParameters'
import { JOBS_PER_SEARCH_QUERY } from '../../../constants'

const TeApi = new TEApi()

/* HELLO TEAM ~ Avic
What are redux sagas?
    Preface: (Ja hoppas att dehär er förståerligt <3 )
        Actions can be dispatched by either the app iteself such as:
        "I the App want to fetch data in the background before the user has done anything!", 
        or more commonly by a user action e.g a click or something.

        I use sagas to act on a particular action. When that action is dispatched, we run a saga.
        The saga will generally try to call an API method, which might fail or succeed.
        Depending on the outcome, the saga will dispatch a "success" or "fail" action

        Sagas are started by "action creators" and they "return" / dispatch actions with certain results.
        [Example of a action creator: jobSearchActions.ts -> searchJobs function in the bottom of the file]
        
        These fail or success results gets stored in the reducer. The reducers job is to directly manipulate
        the state. "Getters" in the reducer file are used to retrieve or read the state.



   -1. Avic ~ A way to manage side effects e.g. API calls that might succeed or fail. They can be more complicated.
    0. Someone calls an action creator => searchJobs in "jobSearchActions.ts"
    1. In the wather saga, we listen to that action => "JobSearchActionTypes.SearchJobs"
    2. We start to execute "loadJobsFlow" -> the saga / generator function that does the work
*/

// Watcher saga
export function* searchJobsSaga() {
    yield takeLatest(JobSearchActionTypes.SearchJobs, loadJobsFlow)
}

// Worker saga
function* loadJobsFlow(action: SearchJobs) {
    try {
        const { language, query, location, start, appendJobsToPreviousJobs } = action
        const data: ApiResponse = yield call(
            TeApi.searchJob,
            language,
            query,
            location,
            start,
            appendJobsToPreviousJobs
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
