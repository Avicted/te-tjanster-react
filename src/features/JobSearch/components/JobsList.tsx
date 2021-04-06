import React, { useEffect, useState } from 'react'
import { Job } from '../../../entities/Job'
import { Link } from 'react-router-dom'
import { Language } from '../../../enums/language'
import { useTranslation } from 'react-i18next'
import { AppState } from '../../../framework/store/rootReducer'
import { getJobSearchParameters, getLoadingData } from '../reducers/jobSearchReducer'
import { useDispatch, useSelector } from 'react-redux'
import { jobSearchActions } from '../actions/jobSearchAction'
import { JobSearchParameters } from '../../../entities/jobSearchParameters'

interface JobsListProps {
    jobs: Job[] | undefined
    totalAmountOfJobs: number | undefined
    language: Language
}

export const JobsList: React.FC<JobsListProps> = ({ jobs, totalAmountOfJobs, language }) => {
    let content: any = null
    const { t, i18n } = useTranslation()
    const [denseList, setDenseList] = useState<boolean>(false)
    const dispatch = useDispatch()
    const isLoading: boolean = useSelector((state: AppState) => getLoadingData(state))
    const previousJobSearchQuery: JobSearchParameters | undefined = useSelector((state: AppState) =>
        getJobSearchParameters(state)
    )

    const fetchMoreJobsWithTheSameQuery = (): void => {
        if (previousJobSearchQuery === undefined) {
            return
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { language, query, location, start } = previousJobSearchQuery
        dispatch(
            jobSearchActions.SearchJobs(Language[i18n.language as keyof typeof Language], query, location, true, start)
        )
    }

    const loadingSpinner = (): React.ReactElement => (
        <div className="flex flex-col items-center pt-24">
            <svg
                className="animate-spin -ml-1 mr-3 h-12 w-12 text-pink-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
            </svg>
        </div>
    )

    useEffect(() => {
        const data = localStorage.getItem('dense_list')
        const result: boolean = data === 'true' ? true : false

        if (data) {
            setDenseList(result)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('dense_list', `${denseList}`)
    })

    if (
        isLoading &&
        (previousJobSearchQuery?.appendJobsToPreviousJobs === undefined ||
            previousJobSearchQuery?.appendJobsToPreviousJobs === false)
    ) {
        return loadingSpinner()
    }

    if (jobs === undefined) {
        return null
    } else if (jobs.length <= 0) {
        content = <div className="text-center p-8">{t('jobs_list_no_jobs_were_found')}</div>
    } else {
        content = (
            <div>
                {jobs.map((job: Job, index: number) => {
                    return (
                        <Link to={`/job/${job.ilmoitusnumero}/${language}`} key={index}>
                            {denseList ? (
                                <div className="group flex flex-col flex-grow justify-between pl-2 pr-2 md:pl-4 md:pr-4 pt-1 pb-1 hover:bg-gray-100 rounded-md">
                                    <div className="flex flex-row align-bottom">
                                        <p className="w-2/3 md:w-auto text-xs text-gray-800 md:text-sm font-semibold group-hover:text-pink-600 pr-4 truncate">
                                            {job.tehtavanimi}
                                        </p>
                                        <span
                                            className={`w-1/3 md:w-auto text-xs md:text-sm text-gray-600 group-hover:no-underline truncate`}
                                        >
                                            {job.tyonantajanNimi} - {job.kunta} - {job.tyonKestoTekstiYhdistetty} -{' '}
                                            {job.tyoaika}
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <div className="group flex flex-col flex-grow justify-between pl-2 pr-2 md:pl-4 md:pr-4 pt-2 pb-2 hover:bg-gray-100 rounded-md">
                                    <div className="text-xs md:text-sm group-hover:text-pink-600 text-gray-800 font-semibold">
                                        {job.tehtavanimi}
                                    </div>
                                    <div className={`text-xs md:text-sm text-gray-600 group-hover:no-underline`}>
                                        {job.tyonantajanNimi} - {job.kunta} - {job.tyonKestoTekstiYhdistetty} -{' '}
                                        {job.tyoaika}
                                    </div>
                                </div>
                            )}
                        </Link>
                    )
                })}
            </div>
        )
    }

    return (
        <>
            <div className="flex flex-row justify-between mb-2 pl-4 md:pl-8">
                {totalAmountOfJobs !== undefined && (
                    <div className="flex flex-col flex-grow">
                        {totalAmountOfJobs > 0 && (
                            <p className="text-xs md:text-lg mt-auto text-gray-600 justify-end">
                                {totalAmountOfJobs} {t('job_search_container_number_of_jobs_found')}
                            </p>
                        )}
                    </div>
                )}
                <div className="flex flex-col">
                    {denseList ? (
                        <button
                            onClick={() => setDenseList(false)}
                            className="h-8 w-8 bg-gray-400 p-1 focus:ring-0 hover:bg-gray-500 text-white font-bold rounded inline-flex items-center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 8h16M4 16h16"
                                />
                            </svg>
                        </button>
                    ) : (
                        <button
                            onClick={() => setDenseList(true)}
                            className="h-8 w-8 bg-gray-400 p-1 hover:bg-gray-500 text-white font-bold rounded inline-flex items-center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            <div className="flex flex-col p-2 md:p-4 shadow-2xl rounded-xl bg-white">{content}</div>

            <div className="flex flex-row justify-center mt-12">
                {totalAmountOfJobs !== undefined && (
                    <>
                        {jobs.length < totalAmountOfJobs && (
                            <button
                                onClick={() => fetchMoreJobsWithTheSameQuery()}
                                className="inline-flex flex-shrink-0 bg-pink-500 text-white text-base font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                            >
                                {isLoading && (
                                    <svg
                                        className="animate-spin ml-1 mr-3 h-5 w-5 text-white"
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
                                )}
                                {t('jobs_list_show_more')}
                            </button>
                        )}
                    </>
                )}
            </div>
        </>
    )
}
