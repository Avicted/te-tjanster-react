import { Transition } from '@headlessui/react'
import format from 'date-fns/format'
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
        <div className="flex flex-col pt-2 md:pt-12">
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
                <div className="text-sm text-2xl pl-8">{jobDetails?.tehtavanimi}</div>
                <div className={`font-normal pl-8 pb-3`}>{jobDetails?.mainAmmatti}</div>
                <div className={`font-normal pl-8 pb-3`}>{jobDetails?.hakemusLahetetaan}</div>
                <div className="flex flex-col flex-grow justify-between bg-white mb-8 shadow-sm rounded p-4 shadow-2xl rounded-xl p-8">
                    <div className="prose min-w-full" style={{ whiteSpace: 'break-spaces' }}>
                        {jobDetails?.kuvausteksti}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 mt-12 break-words">
                        {jobDetails?.yhteystiedot && (
                            <div className="mb-6 lg:mb-0">
                                <p className="font-bold">Kontakt:</p>
                                <p className="font-medium">{jobDetails?.yhteystiedot}</p>
                            </div>
                        )}

                        {jobDetails?.tyonantajanWwwOsoite && (
                            <div className="mb-6 lg:mb-0">
                                <p className="font-bold">Hemsida:</p>
                                <a
                                    href={jobDetails.tyonantajanWwwOsoite}
                                    className="hover:text-pink-500 hover:underline"
                                >
                                    {jobDetails.tyonantajanWwwOsoite}
                                </a>
                            </div>
                        )}

                        {jobDetails?.tyoaika && (
                            <div className="mb-6 lg:mb-0">
                                <p className="font-bold">Arbetstid:</p>
                                <p className="font-medium">{jobDetails.tyoaika}</p>
                            </div>
                        )}

                        {jobDetails?.viimeinenHakupaivamaara && (
                            <div className="mb-6 lg:mb-0">
                                <p className="font-bold">Sista ansökningsdatum:</p>
                                <p className="font-medium">
                                    {format(new Date(jobDetails?.viimeinenHakupaivamaara), 'dd-MM-yyyy')}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </Transition>
        </div>
    )
}
