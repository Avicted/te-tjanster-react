import { createStore, applyMiddleware } from 'redux'
import rootReducer from './rootReducer'
import { compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import {
    getJobDetailsSaga,
    getLocationsSaga,
    getProfessionsSaga,
    searchJobsSaga,
} from '../../features/JobSearch/sagas/jobSearchSagas'

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
    }
}

const composeEnhancers =
    (process.env.NODE_ENV !== 'production' &&
        typeof window !== 'undefined' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

// configure middlewares
const middlewares = [sagaMiddleware]

// compose enhancers
const enhancer = composeEnhancers(applyMiddleware(...middlewares))

// rehydrate state on app start
const initialState = {}

// create store
const store = createStore(rootReducer, initialState, enhancer)

// Run sagas
sagaMiddleware.run(searchJobsSaga)
sagaMiddleware.run(getJobDetailsSaga)
sagaMiddleware.run(getLocationsSaga)
sagaMiddleware.run(getProfessionsSaga)

// export store singleton instance
export default store
