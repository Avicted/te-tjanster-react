import { Menu, Transition } from '@headlessui/react'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Theme } from '../../../enums/theme'
import { changeTheme, getActiveTheme } from '../../../shared/utilities'

interface LanguageSelectionProps {}

export const LanugageSelection: React.FC<LanguageSelectionProps> = () => {
    const { i18n, t } = useTranslation()
    let theme: Theme | undefined = getActiveTheme()

    useEffect(() => {
        document.title = t('all_app_title')
        localStorage.setItem('language', i18n.language)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [i18n.language, t, localStorage.theme])

    return (
        <div className="flex flex-row justify-center md:justify-end mt-4">
            {theme === Theme.light && (
                <button
                    onClick={() => changeTheme(Theme.dark)}
                    className="h-8 w-8 bg-gray-400 p-1 focus:ring-0 hover:bg-gray-500 text-white font-bold rounded inline-flex items-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                        />
                    </svg>
                </button>
            )}

            {theme === Theme.dark && (
                <button
                    onClick={() => changeTheme(Theme.light)}
                    className="h-8 w-8 bg-gray-400 p-1 focus:ring-0 hover:bg-gray-500 text-white font-bold rounded inline-flex items-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                    </svg>
                </button>
            )}

            <div className="relative inline-block">
                <Menu>
                    {({ open }) => (
                        <>
                            <span className="rounded-md shadow-sm">
                                <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-pink-300 focus:shadow-outline-pink active:bg-gray-50 active:text-gray-800">
                                    <svg
                                        className="w-5 h-5 ml-2 mr-2"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <span>{t('language_selection_language')}</span>
                                    <svg className="w-5 h-5 ml-2 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </Menu.Button>
                            </span>

                            <Transition
                                show={open}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items
                                    static
                                    className="absolute right-0 w-36 md:w-42 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                                >
                                    <div className="py-1">
                                        <Menu.Item onClick={(event) => i18n.changeLanguage('sv')}>
                                            {({ active }) => (
                                                <p
                                                    className={`${
                                                        i18n.language === 'sv'
                                                            ? 'bg-gray-100 text-pink-500'
                                                            : 'text-gray-700'
                                                    } ${
                                                        active ? 'bg-gray-100 text-pink-500' : ''
                                                    } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left cursor-pointer`}
                                                >
                                                    Svenska
                                                </p>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item onClick={() => i18n.changeLanguage('fi')}>
                                            {({ active }) => (
                                                <p
                                                    className={`${
                                                        i18n.language === 'fi'
                                                            ? 'bg-gray-100 text-pink-500'
                                                            : 'text-gray-700'
                                                    } ${
                                                        active ? 'bg-gray-100 text-pink-500' : ''
                                                    } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left cursor-pointer`}
                                                >
                                                    Suomi
                                                </p>
                                            )}
                                        </Menu.Item>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </>
                    )}
                </Menu>
            </div>
        </div>
    )
}
