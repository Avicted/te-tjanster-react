import { combineReducers } from 'redux'
import { jobSearchReducer } from '../../features/JobSearch/reducers/jobSearchReducer'

const rootReducer = combineReducers({
    jobSearch: jobSearchReducer,
})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer
