import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Job } from '../../../entities/Job'
import { Language } from '../../../enums/language'
import { AppState } from '../../../framework/store/rootReducer'
import { searchJobs } from '../actions/jobSearchAction'
import { JobsList } from '../components/JobsList'
import { getJobsFound, getLoadingData, getLoadingDataError, getError } from '../reducers/jobSearchReducer'

export interface JobsSearchProps {
    jobsFound: Job[] | undefined
    loadingData: boolean
    loadingDataError: boolean
    error: string | undefined
    onSearchJobs: (language: Language, query: string, location: string) => void
}

class JobSearch extends Component<JobsSearchProps> {
    constructor(props: Readonly<JobsSearchProps>) {
        super(props)
        const { onSearchJobs } = this.props
        onSearchJobs(Language.sv, 'programmer', '')
    }

    render() {
        const { jobsFound } = this.props

        // @TODO: hardcoded
        const language: Language = Language.sv
        return (
            <div className="">
                <div>Nu ska vi hitta jobb! :)</div>
                <JobsList jobs={jobsFound} language={language} />
            </div>
        )
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        jobsFound: getJobsFound(state),
        loadingData: getLoadingData(state),
        loadingDataError: getLoadingDataError(state),
        error: getError(state),
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onSearchJobs: (language: Language, query: string, location: string) => {
            dispatch(searchJobs(language, query, location))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobSearch)
