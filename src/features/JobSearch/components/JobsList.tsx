import React from 'react'
import { Job } from '../../../entities/Job'
import { Link } from 'react-router-dom'
import { Language } from '../../../enums/language'

interface JobsListProps {
    jobs: Job[] | undefined
    language: Language
}

export const JobsList: React.FC<JobsListProps> = ({ jobs, language }) => {
    if (jobs === undefined) {
        return <div>No jobs to list</div>
    } else {
        return (
            <div className="flex flex-col dark bg-gray-800 shadow-sm rounded p-4">
                {jobs.map((job: Job, index: number) => {
                    return (
                        <Link to={`/job/${job.ilmoitusnumero}/${language}`} key={index}>
                            <div className="flex flex-col flex-grow justify-between mb-8">
                                <div className="text-sm text-white text-2xl">{job.tehtavanimi}</div>
                                <div className={`font-normal`}>
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
}
