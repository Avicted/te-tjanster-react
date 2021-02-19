import React, { Component } from 'react'
import { WithTranslation, withTranslation } from 'react-i18next'
// import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Footer } from './Footer'
// import { Dispatch } from 'redux'
// import { AppState } from '../store/rootReducer'
// import { connect } from 'react-redux'

export interface AppComponentProps extends WithTranslation {
    children: React.ReactNode
}

export interface AppComponentState {}

class AppComponent extends Component<AppComponentProps, AppComponentState> {
    render() {
        const { children } = this.props
        return (
            <div className="min-h-screen p-4 md:p-0">
                <div className="container mx-auto font-sans bg-transparent">{children}</div>
                <Footer />
            </div>
        )
    }
}

// const mapStateToProps = (state: AppState) => ({})
// const mapDispatchToProps = (dispatch: Dispatch) => {}

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withTranslation()(AppComponent)))
export default withTranslation()(AppComponent)
