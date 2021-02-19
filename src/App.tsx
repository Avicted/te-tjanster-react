import React, { Suspense } from 'react'
import './theme/app.css'
import { Provider } from 'react-redux'
import store from './framework/store'
import AppComponent from './framework/components/AppComponent'
import { HashRouter, Route, Switch } from 'react-router-dom'
import JobSearchContainer from './features/JobSearch/containers/JobSearchContainer'
import { JobsDetails } from './features/JobSearch/components/jobDetails'
import './localization/i18n'
;(window as any).store = store
function App() {
    return (
        <Provider store={store}>
            <HashRouter>
                <Suspense fallback={'loading'}>
                    <AppComponent useSuspense={true}>
                        <Switch>
                            <Route exact path="/" component={JobSearchContainer} />
                            <Route path="/job/:id/:language" component={JobsDetails} />
                        </Switch>
                    </AppComponent>
                </Suspense>
            </HashRouter>
        </Provider>
    )
}

export default App
