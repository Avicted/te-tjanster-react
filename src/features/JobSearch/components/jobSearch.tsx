import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Language } from '../../../enums/language'
import { AppState } from '../../../framework/store/rootReducer'
import { jobSearchActions } from '../actions/jobSearchAction'
import { getLocations, getProfessionsChecked } from '../reducers/jobSearchReducer'
import { Menu, Transition } from '@headlessui/react'
import { useTranslation } from 'react-i18next'
import { capitalizeFirstCharacterInString } from '../../../shared/utilities'
import { FilterDialog } from './filterDialog'

interface JobSearchProps {}

type FormData = {
    query: string
    location: string
}

export const JobSearch: React.FC<JobSearchProps> = () => {
    const { t, i18n } = useTranslation()
    const { register, handleSubmit, watch, setValue, errors, formState, trigger } = useForm<FormData>({
        mode: 'all',
        reValidateMode: 'onChange',
        defaultValues: {
            location: '',
            query: '',
        },
    })
    const watchLocation = watch('location', '')
    const dispatch = useDispatch()
    const professionsChecked: string[] = useSelector((state: AppState) => getProfessionsChecked(state))
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
            jobSearchActions.SearchJobs(
                Language[i18n.language as keyof typeof Language],
                query,
                location,
                false,
                0,
                professionsChecked
            )
        )
    }

    useEffect(() => {
        if (i18n.language === '' || i18n.language === undefined) {
            return
        }

        const currentLanguage: Language = Language[i18n.language as keyof typeof Language]
        dispatch(jobSearchActions.GetLocations(currentLanguage))
        dispatch(jobSearchActions.GetProfessions(currentLanguage))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [i18n.language])

    const { isValid, isDirty } = formState

    useEffect(() => {
        console.log({ isValid, isDirty, formState, errors })
    }, [isValid, isDirty, formState, errors])

    useEffect(() => {
        trigger()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // @TODO: location "Mänttä-Vilppula" is not valid in the form?
    return (
        <div className="flex flex-col pt-12 md:pt-32 pb-16">
            <h1 className="font-sans text-2xl md:text-3xl text-center text-black font-bold mb-6">
                {t('job_search_title')}
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap justify-center">
                <div className="flex w-full pb-4 pl-0 pr-0 sm:pl-4 sm:pr-4 sm:w-3/4 md:w-1/2 md:order-1">
                    <input
                        ref={register({ required: false })}
                        autoComplete="off"
                        name="query"
                        className={`flex-1 appearance-none border border-transparent w-full py-2 px-4 bg-white text-gray-800 placeholder-gray-500 shadow-md rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent`}
                        type="text"
                        placeholder={t('job_search_job_title')}
                    />
                </div>
                <div className="flex w-full pb-4 pl-0 pr-0 sm:pl-4 sm:pr-4 sm:w-3/4 md:w-1/2 md:order-2">
                    <div className="relative inline-block text-left w-full">
                        <Menu>
                            <>
                                {errors.location?.type === 'validate' && watchLocation.length > 0 && (
                                    <span className="absolute inset-y-0 right-3 flex items-center pl-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            className="w-6 h-6 text-red-600"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                            />
                                        </svg>
                                    </span>
                                )}
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
                                    className={`${
                                        errors.location && watchLocation.length > 0 ? 'ring-2 ring-red-600' : ''
                                    } flex-1 appearance-none border border-transparent w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-500 shadow-md rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent`}
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
                                        className="z-10 absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
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

                {/* {errors.location && watchLocation.length > 0 && (
                    <div className="w-full w-2/4 flex flex-row md:flex-row text-left text-red-600 font-bold pt-4">
                        <p>{t('job_search_invalid_location')}</p>
                    </div>
                )} */}

                {/*  Filter button */}
                <div className="flex justify-center w-full pb-4 pl-0 pr-0 sm:pl-4 sm:pr-4 sm:w-3/4 md:w-full md:order-3">
                    <span className="relative inline-flex rounded-md shadow-sm w-full md:w-2/5 lg:w-1/5">
                        <button
                            type="button"
                            onClick={() => dispatch(jobSearchActions.ShowFilterDialog())}
                            className={`w-full inline-flex justify-center items-center text-white bg-blue-500 flex-shrink-0 text-base font-bold py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-200`}
                        >
                            <svg
                                className={`${
                                    professionsChecked.length > 0
                                        ? 'text-green-200 stroke-current animate-pulse'
                                        : 'stroke-current'
                                } h-5 w-5 mr-3`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            {t('job_search_filter')}
                        </button>
                    </span>
                </div>

                <div className="flex justify-center w-full pl-0 pr-0 sm:pl-4 sm:pr-4 sm:w-3/4 md:w-full md:order-4">
                    <button
                        type="submit"
                        className="w-full md:w-2/5 lg:w-1/5 flex-shrink-0 bg-pink-500 text-white text-base font-semibold py-2 rounded-lg shadow-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                    >
                        {t('job_search_search')}
                    </button>
                </div>
            </form>
            <FilterDialog />
        </div>
    )
}
