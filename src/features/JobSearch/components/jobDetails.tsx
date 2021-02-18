import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { JobDetails } from '../../../entities/jobDetails'
import { Language } from '../../../enums/language'
import { AppState } from '../../../framework/store/rootReducer'
import { jobSearchActions } from '../actions/jobSearchAction'
import { getJobDetails, getLoadingJobDetails, getLoadingJobDetailsError } from '../reducers/jobSearchReducer'

interface JobDetailsProps {}

export const JobsDetails: React.FC<JobDetailsProps> = () => {
    const { id, language } = useParams<{ id: string; language: string }>()
    const dispatch = useDispatch()
    const jobDetails: JobDetails | undefined = useSelector((state: AppState) => getJobDetails(state))

    useEffect(() => {
        dispatch(jobSearchActions.GetJobDetails(id, language as Language))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const loadingJobDetails: boolean = useSelector((state: AppState) => getLoadingJobDetails(state))
    const loadingJobDetailsError: string | undefined = useSelector((state: AppState) =>
        getLoadingJobDetailsError(state)
    )

    if (loadingJobDetailsError !== undefined) {
        return <div>Error: {loadingJobDetailsError}</div>
    }

    if (loadingJobDetails) {
        return <>Loading</>
    }

    return (
        <div className="flex flex-col shadow-sm rounded pt-16">
            <div className="text-sm text-2xl">{jobDetails?.tehtavanimi}</div>
            <div className={`font-normal`}>{jobDetails?.mainAmmatti}</div>
            <div className="flex flex-col flex-grow justify-between mb-8 shadow-sm rounded p-4 shadow-2xl rounded-xl p-8">
                <div className={`font-normal`} style={{ whiteSpace: 'break-spaces' }}>
                    {jobDetails?.kuvausteksti}
                </div>
            </div>
        </div>
    )
}
