import React from 'react'
import { Job } from '../../../entities/Job'
import { Link } from 'react-router-dom'
import { Language } from '../../../enums/language'
import { useTranslation } from 'react-i18next'

interface JobsListProps {
    jobs: Job[] | undefined
    language: Language
}

export const JobsList: React.FC<JobsListProps> = ({ jobs, language }) => {
    const { t } = useTranslation()
    let content: any = null

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

    return <div className="flex flex-col p-4 shadow-2xl rounded-xl bg-white">{content}</div>
}
