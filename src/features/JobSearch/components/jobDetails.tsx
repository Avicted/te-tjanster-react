import { Transition } from '@headlessui/react'
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
        return <div className="flex flex-col justify-center h-screen text-center">Laddar</div>
    }

    return (
        <div className="flex flex-col pt-16">
            <Transition
                appear={true}
                show={loadingJobDetails === false}
                enter="transition-opacity duration-75"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-500"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="text-sm text-2xl">{jobDetails?.tehtavanimi}</div>
                <div className={`font-normal pb-3`}>{jobDetails?.mainAmmatti}</div>
                <div className="flex flex-col flex-grow justify-between bg-white mb-8 shadow-sm rounded p-4 shadow-2xl rounded-xl p-8">
                    <div className="prose min-w-full" style={{ whiteSpace: 'break-spaces' }}>
                        {jobDetails?.kuvausteksti}
                    </div>
                </div>
            </Transition>
        </div>
    )
}
