import { i18n } from 'i18next'
import React, { Component } from 'react'
import { WithTranslation, withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Job } from '../../../entities/Job'
import { Language } from '../../../enums/language'
import { AppState } from '../../../framework/store/rootReducer'
import { JobSearch } from '../components/jobSearch'
import { JobsList } from '../components/JobsList'
import { LanugageSelection } from '../components/languageSelection'
import {
    getJobsFound,
    getLoadingData,
    getLoadingDataError,
    getJobSearchError,
    getTotalAmountOfJobs,
} from '../reducers/jobSearchReducer'

export interface JobsSearchContainerProps extends WithTranslation {
    t: any
    i18n: i18n
    useSuspense: boolean
    jobs: Job[] | undefined
    totalAmountOfJobs: number | undefined
    loadingData: boolean
    loadingDataError: boolean
    error: string | undefined
}

class JobSearchContainer extends Component<JobsSearchContainerProps> {
    render() {
        const { jobs, totalAmountOfJobs, i18n } = this.props
        const language: Language = Language[i18n.language as keyof typeof Language]

        return (
            <div className="bg-transparent">
                <LanugageSelection />
                <JobSearch />
                <JobsList jobs={jobs} totalAmountOfJobs={totalAmountOfJobs} language={language} />
            </div>
        )
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        jobs: getJobsFound(state),
        totalAmountOfJobs: getTotalAmountOfJobs(state),
        loadingData: getLoadingData(state),
        loadingDataError: getLoadingDataError(state),
        error: getJobSearchError(state),
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(JobSearchContainer))
