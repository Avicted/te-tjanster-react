import React, { Component } from 'react'
import { WithTranslation, withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Job } from '../../../entities/Job'
import { Language } from '../../../enums/language'
import { AppState } from '../../../framework/store/rootReducer'
import { getLocations } from '../actions/jobSearchAction'
import { JobSearch } from '../components/jobSearch'
import { JobsList } from '../components/JobsList'
import { LanugageSelection } from '../components/languageSelection'
import { getJobsFound, getLoadingData, getLoadingDataError, getError } from '../reducers/jobSearchReducer'

export interface JobsSearchContainerProps extends WithTranslation {
    t: any
    useSuspense: boolean
    jobsFound: Job[] | undefined
    loadingData: boolean
    loadingDataError: boolean
    error: string | undefined
    onGetLocations: (language: Language) => void
}

class JobSearchContainer extends Component<JobsSearchContainerProps> {
    constructor(props: Readonly<JobsSearchContainerProps>) {
        super(props)
        const { onGetLocations } = this.props
        onGetLocations(Language.sv)
    }

    render() {
        const { jobsFound, t } = this.props

        // @TODO: hardcoded
        const language: Language = Language.sv
        return (
            <div className="bg-transparent">
                <LanugageSelection />
                <JobSearch />
                {jobsFound && jobsFound.length > 0 && (
                    <p className="text-gray-600 pl-8 pb-2">
                        {jobsFound.length} {t('job_search_container_number_of_jobs_found')}
                    </p>
                )}
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
        onGetLocations: (language: Language) => {
            dispatch(getLocations(language))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(JobSearchContainer))
