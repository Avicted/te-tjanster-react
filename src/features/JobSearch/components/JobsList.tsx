import React from 'react'
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
    const { t, i18n } = useTranslation()
    const dispatch = useDispatch()
    const isLoading: boolean = useSelector((state: AppState) => getLoadingData(state))
    const previousJobSearchQuery: JobSearchParameters | undefined = useSelector((state: AppState) =>
        getJobSearchParameters(state)
    )
    let content: any = null

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

    if (isLoading) {
        return (
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
        )
    }

    if (jobs === undefined) {
        return null
    } else if (jobs.length <= 0) {
        content = <div className="text-center p-8">{t('jobs_list_no_jobs_were_found')}</div>
    } else {
        // @TODO: button toggle: -> save the preference in localStorage!
        // "dense" list? a smaller version of the list, think of the gmail email listings. Their height is like 10-20px?
        content = (
            <div>
                {jobs.map((job: Job, index: number) => {
                    return (
                        <Link to={`/job/${job.ilmoitusnumero}/${language}`} key={index}>
                            <div className="group flex flex-col flex-grow justify-between p-4 hover:bg-gray-100 rounded-xl">
                                <div className="text-xl font-medium group-hover:text-pink-500">{job.tehtavanimi}</div>
                                <div className={`font-normal text-gray-600 group-hover:no-underline`}>
                                    {job.tyonantajanNimi} - {job.kunta} - {job.tyonKestoTekstiYhdistetty} -{' '}
                                    {job.tyoaika}
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        )
    }

    return (
        <>
            {totalAmountOfJobs && (
                <p className="text-gray-600 pl-8 pb-2">
                    {totalAmountOfJobs} {t('job_search_container_number_of_jobs_found')}
                </p>
            )}
            <div className="flex flex-col p-4 shadow-2xl rounded-xl bg-white">{content}</div>
            <div className="flex flex-row justify-center mt-12">
                <button
                    onClick={() => fetchMoreJobsWithTheSameQuery()}
                    className="flex-shrink-0 bg-pink-500 text-white text-base font-semibold py-2 px-8 rounded-lg shadow-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                >
                    {t('jobs_list_show_more')}
                </button>
            </div>
        </>
    )
}
