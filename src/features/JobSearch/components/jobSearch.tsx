import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Language } from '../../../enums/language'
import { AppState } from '../../../framework/store/rootReducer'
import { jobSearchActions } from '../actions/jobSearchAction'
import { getLocations } from '../reducers/jobSearchReducer'
import { getLocations as onGetLocations } from '../actions/jobSearchAction'
import { Menu, Transition } from '@headlessui/react'
import { useTranslation } from 'react-i18next'
import { capitalizeFirstCharacterInString } from '../../../shared/utilities'

interface JobSearchProps {}

type FormData = {
    query: string
    location: string
}

export const JobSearch: React.FC<JobSearchProps> = () => {
    const { t, i18n } = useTranslation()
    const { register, handleSubmit, watch, setValue, errors } = useForm<FormData>({
        mode: 'onChange',
        reValidateMode: 'onChange',
    })
    const watchLocation = watch('location', '')
    const dispatch = useDispatch()
    const locations: string[] | undefined = useSelector((state: AppState) =>
        getLocations(state)?.kunta.map((item) => item.kuvaus)
    )

    const filteredLocations = (locationQuery: string): string[] => {
        if (locations === undefined || locationQuery === '') {
            return []
        }

        locationQuery = capitalizeFirstCharacterInString(locationQuery)
        const locationMatches: string[] = locations.filter((location: string) => location.includes(locationQuery))

        // @Note: if we find an exact match, we know that the user has either:
        // 1. typed an exact location
        // 2. clicked on a location in the menu
        if (locationMatches.length === 1 && locationMatches[0] === locationQuery) {
            return []
        } else {
            return locationMatches
        }
    }

    const onSubmit = (formData: FormData) => {
        const { query, location } = formData
        dispatch(
            jobSearchActions.SearchJobs(Language[i18n.language as keyof typeof Language], query, location, false, 0)
        )
    }

    useEffect(() => {
        if (i18n.language === '' || i18n.language === undefined) {
            return
        }

        dispatch(onGetLocations(Language[i18n.language as keyof typeof Language]))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [i18n.language])

    return (
        <div className="flex flex-col pt-12 md:pt-32 pb-16">
            <h1 className="font-sans text-3xl text-center text-black font-bold mb-6">{t('job_search_title')}</h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-nowrap md:flex-wrap flex-col md:flex-row gap-4 md:justify-center"
            >
                <div className="flex flex-row md:flex-col w-full md:w-1/4">
                    <input
                        ref={register({ required: false })}
                        autoComplete="off"
                        name="query"
                        className={`flex-1 appearance-none border border-transparent w-full py-2 px-4 bg-white text-gray-800 placeholder-gray-500 shadow-md rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent`}
                        type="text"
                        placeholder={t('job_search_job_title')}
                    />
                </div>
                <div className="flex flex-row md:flex-col w-full md:w-1/6">
                    <div className="relative inline-block text-left w-full">
                        <Menu>
                            <>
                                <input
                                    ref={register({
                                        required: false,
                                        validate: (value: string): boolean => {
                                            if (locations === undefined) {
                                                return false
                                            }

                                            if (value.length <= 0) {
                                                return true
                                            }

                                            value = capitalizeFirstCharacterInString(value)

                                            if (value === '') {
                                                return false
                                            }

                                            return locations.includes(value)
                                        },
                                    })}
                                    autoComplete="off"
                                    name="location"
                                    type="text"
                                    className="flex-1 appearance-none border border-transparent w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-500 shadow-md rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                                    placeholder={t('job_search_location')}
                                />

                                <Transition
                                    show={filteredLocations(watchLocation).length > 0 ? true : false}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items
                                        static
                                        className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                                    >
                                        <div className="py-1">
                                            {filteredLocations(watchLocation).map((location: string, index: number) => {
                                                return (
                                                    <div key={index} className="cursor-pointer group">
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <p
                                                                    onClick={() => {
                                                                        setValue('location', location, {
                                                                            shouldValidate: true,
                                                                        })
                                                                    }}
                                                                    className={`${
                                                                        active
                                                                            ? 'bg-gray-100 text-pink-500'
                                                                            : 'text-gray-700'
                                                                    } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                                                                >
                                                                    {location}
                                                                </p>
                                                            )}
                                                        </Menu.Item>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </>
                        </Menu>
                    </div>
                </div>
                <div className="flex flex-row md:flex-col">
                    <button
                        type="submit"
                        className="w-full md:w-auto h-full flex-shrink-0 bg-pink-500 text-white text-base font-semibold py-2 px-8 rounded-lg shadow-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                    >
                        {t('job_search_search')}
                    </button>
                </div>

                {errors.location && watchLocation.length > 0 && (
                    <div className="w-2/4 flex flex-row md:flex-row text-left text-red-600 font-bold pt-4">
                        <p>{t('job_search_invalid_location')}</p>
                    </div>
                )}
            </form>
        </div>
    )
}
