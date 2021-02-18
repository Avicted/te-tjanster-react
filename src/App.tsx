import React from 'react'
import './theme/app.css'
import { Provider } from 'react-redux'
import store from './framework/store'
import AppComponent from './framework/components/AppComponent'
import { HashRouter, Route, Switch } from 'react-router-dom'
import JobSearchContainer from './features/JobSearch/containers/JobSearch'
import { JobsDetails } from './features/JobSearch/components/jobDetails'
;(window as any).store = store
function App() {
    return (
        <Provider store={store}>
            <HashRouter>
                <AppComponent>
                    <Switch>
                        <Route exact path="/" component={JobSearchContainer} />
                        <Route path="/job/:id/:language" component={JobsDetails} />
                    </Switch>
                </AppComponent>
            </HashRouter>
        </Provider>
    )
}

export default App
