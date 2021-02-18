import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Language } from '../../../enums/language'
import { AppState } from '../../../framework/store/rootReducer'
import { jobSearchActions } from '../actions/jobSearchAction'
import { getLocations } from '../reducers/jobSearchReducer'
import { Menu, Transition } from '@headlessui/react'
import { capitalizeFirstCharacterInString } from '../../../utilities'

interface JobSearchProps {}

type FormData = {
    query: string
    location: string
}

export const JobSearch: React.FC<JobSearchProps> = () => {
    const { register, handleSubmit, watch, setValue, errors, formState } = useForm<FormData>({
        mode: 'onChange',
        reValidateMode: 'onChange',
    })
    const [showLocationSuggestions, setShowLocationSuggestions] = useState<boolean>(false)
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
        dispatch(jobSearchActions.SearchJobs(Language.sv, query, location))
    }

    useEffect(() => {
        if (errors) {
            console.log(errors)
        }
        console.log({
            showLocationSuggestions,
        })
    }, [errors, showLocationSuggestions])

    return (
        <div className="flex flex-col pt-32 pb-16">
            <h1 className="font-sans text-3xl text-center text-black font-bold mb-6">TE-Tjänster på riktigt!</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row gap-4 justify-center">
                <div className="flex flex-col w-1/4">
                    <input
                        ref={register({ required: true, minLength: 2 })}
                        autoComplete="off"
                        name="query"
                        className={`flex-1 appearance-none border border-transparent w-full py-2 px-4 bg-white text-gray-800 placeholder-gray-500 shadow-md rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent`}
                        type="text"
                        placeholder="Sök jobb"
                    />
                </div>
                <div className="flex flex-col">
                    <div className="relative inline-block text-left">
                        <Menu>
                            <>
                                <input
                                    ref={register({
                                        required: true,
                                        minLength: 2,
                                        validate: (value: string): boolean => {
                                            if (locations === undefined) {
                                                return false
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
                                    placeholder="Ort"
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

                                                                        setShowLocationSuggestions(false)
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
                {errors.location && watchLocation.length > 0 && <p>Orten är ogiltig</p>}
            </div>
        </div>
    )
}
