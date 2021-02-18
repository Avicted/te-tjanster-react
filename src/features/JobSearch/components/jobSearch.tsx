import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Language } from '../../../enums/language'
import { AppState } from '../../../framework/store/rootReducer'
import { jobSearchActions } from '../actions/jobSearchAction'
import { getLocations } from '../reducers/jobSearchReducer'

interface JobSearchProps {}

type FormData = {
    query: string
    location: string
}

export const JobSearch: React.FC<JobSearchProps> = () => {
    const { register, handleSubmit, watch, errors } = useForm<FormData>({
        mode: 'onChange',
        reValidateMode: 'onChange',
    })
    const dispatch = useDispatch()
    const locations: string[] | undefined = useSelector((state: AppState) =>
        getLocations(state)?.kunta.map((item) => item.kuvaus)
    )

    const onSubmit = (formData: FormData) => {
        const { query, location } = formData
        dispatch(jobSearchActions.SearchJobs(Language.sv, query, location))
    }

    useEffect(() => {
        if (locations !== undefined) {
            console.log(locations)
        }
    }, [])

    useEffect(() => {
        if (errors) {
            console.log(errors)
        }
    }, [errors])

    return (
        <div className="flex flex-col pt-32 pb-16">
            <h1 className="font-sans text-3xl text-center text-black font-bold mb-6">TE-Tjänster på riktigt!</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row gap-4 justify-center">
                <div className="flex flex-col w-1/4">
                    <input
                        ref={register({ required: true })}
                        autoComplete="false"
                        name="query"
                        className="flex-1 appearance-none border border-transparent w-full py-2 px-4 bg-white text-gray-800 placeholder-gray-500 shadow-md rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                        type="text"
                        placeholder="Sök jobb"
                    />
                </div>
                <div className="flex flex-col">
                    <input
                        ref={register({
                            required: true,
                            validate: (value: string): boolean => {
                                if (locations === undefined) {
                                    return false
                                }

                                value = value.charAt(0).toUpperCase() + value.slice(1)
                                return locations.includes(value)
                            },
                        })}
                        autoComplete="false"
                        name="location"
                        type="text"
                        className="flex-1 appearance-none border border-transparent w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-500 shadow-md rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                        placeholder="Ort"
                    />
                </div>
                <div className="flex flex-col">
                    <button
                        type="submit"
                        className="h-full flex-shrink-0 bg-pink-500 text-white text-base font-semibold py-2 px-8 rounded-lg shadow-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                    >
                        Sök
                    </button>
                </div>
            </form>
            <div className="flex flex-col text-center text-red-600 font-bold pt-4">
                {errors.location && <p>Orten är ogiltig</p>}
            </div>
        </div>
    )
}
