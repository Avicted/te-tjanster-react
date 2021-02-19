import { Transition } from '@headlessui/react'
import format from 'date-fns/format'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { JobDetails } from '../../../entities/jobDetails'
import { Language } from '../../../enums/language'
import { AppState } from '../../../framework/store/rootReducer'
import { jobSearchActions } from '../actions/jobSearchAction'
import { getJobDetails, getLoadingJobDetails, getLoadingJobDetailsError } from '../reducers/jobSearchReducer'

interface JobDetailsProps {}

export const JobsDetails: React.FC<JobDetailsProps> = () => {
    const { t } = useTranslation()
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
        return (
            <div className="flex flex-col justify-center h-screen text-center">
                <div className="flex flex-col items-center pt-24">
                    <svg
                        className="animate-spin -ml-1 mr-3 h-12 w-12 text-pink-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col pt-4 md:pt-12">
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
                <div className="text-2xl font-bold pl-4 md:pl-8">{jobDetails?.tehtavanimi}</div>
                <div className={`font-normal pl-4 md:pl-8 pb-3`}>{jobDetails?.mainAmmatti}</div>
                <div className="flex flex-col flex-grow justify-between bg-white mb-8 shadow-2xl print:shadow-none rounded-xl">
                    <div className="prose-sm md:prose p-4 md:p-8 min-w-full" style={{ whiteSpace: 'break-spaces' }}>
                        {jobDetails?.kuvausteksti}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 p-4 md:p-8 mt-12 break-words text-sm md:text-base bg-gray-100 text-gray-600 rounded-b-xl">
                        {jobDetails?.yhteystiedot && (
                            <div className="mb-6 pr-0 lg:pr-2 lg:mb-0">
                                <p className="font-bold text-black pb-1">{t('job_details_contact')}</p>
                                <p className="font-medium">{jobDetails?.yhteystiedot}</p>
                            </div>
                        )}

                        {jobDetails?.tyonantajanWwwOsoite && (
                            <div className="mb-6 pr-0 lg:pr-2 lg:mb-0">
                                <p className="font-bold text-black pb-1">{t('job_details_website')}</p>
                                <a
                                    href={jobDetails.tyonantajanWwwOsoite}
                                    className="hover:text-pink-600 hover:underline"
                                >
                                    {jobDetails.tyonantajanWwwOsoite}
                                </a>
                            </div>
                        )}

                        {jobDetails?.tyoaika && (
                            <div className="mb-6 pr-0 lg:pr-2 lg:mb-0">
                                <p className="font-bold text-black pb-1">{t('job_details_worktime')}</p>
                                <p className="font-medium">{jobDetails.tyoaika}</p>
                            </div>
                        )}

                        {jobDetails?.viimeinenHakupaivamaara && (
                            <div className="mb-6 lg:mb-0">
                                <p className="font-bold text-black pb-1">
                                    {t('job_details_deadline_for_applications')}
                                </p>
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
