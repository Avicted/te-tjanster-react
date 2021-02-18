import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
// import { Dispatch } from 'redux'
// import { AppState } from '../store/rootReducer'
// import { connect } from 'react-redux'

export interface AppComponentProps extends RouteComponentProps {}
export interface AppComponentState {}

class AppComponent extends Component<AppComponentProps, AppComponentState> {
    render() {
        const { children } = this.props
        return <div className="container mx-auto min-h-screen font-sans bg-gray-50">{children}</div>
    }
}

// const mapStateToProps = (state: AppState) => ({})
// const mapDispatchToProps = (dispatch: Dispatch) => {}

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppComponent))
export default withRouter(AppComponent)
