import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Profession } from '../../../entities/profession'
import { AppState } from '../../../framework/store/rootReducer'
import { jobSearchActions } from '../actions/jobSearchAction'
import { getProfessionsChecked, getProfessions, getShowFilterDialog } from '../reducers/jobSearchReducer'

interface FilterDialogProps {}

export const FilterDialog: React.FC<FilterDialogProps> = () => {
    const { t } = useTranslation()
    const showFilterDilaog: boolean = useSelector((state: AppState) => getShowFilterDialog(state))
    const professions: Profession[] | undefined = useSelector((state: AppState) => getProfessions(state))
    const professionsChecked: string[] = useSelector((state: AppState) => getProfessionsChecked(state))
    const [professionCategoriesOpened, setProfessionCategoriesOpened] = useState<string[]>([])
    const margins: string[] = ['ml-0', 'ml-8', 'ml-16', 'ml-24', 'ml-32', 'ml-40', 'ml-48']
    const dispatch = useDispatch()

    const setShowDialog = (value: boolean): void => {
        if (value === true) {
            dispatch(jobSearchActions.ShowFilterDialog())
        } else {
            dispatch(jobSearchActions.HideFilterDialog())
        }
    }

    const onToggleCheckbox = (event: React.ChangeEvent<HTMLInputElement>): void => {
        event.stopPropagation()

        const professionId: string = event.target.value
        if (professionId.length <= 0 || professions === undefined) {
            return
        }

        const checked: boolean = event.target.checked

        if (checked === true) {
            dispatch(jobSearchActions.ProfessionChecked(professionId))
        } else {
            dispatch(jobSearchActions.ProfessionUnchecked(professionId))
        }
    }

    const openProfessionCategory = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        professionId: string
    ): void => {
        if (professionId.startsWith('X') || getChildProfessionsCount(professionId) <= 0) {
            return
        }

        // Push new unique item to the end of the array
        if (!professionCategoriesOpened.includes(professionId)) {
            setProfessionCategoriesOpened((previousArray) => [...previousArray, professionId])
        } else {
            // Remove the unique item from the array, if it is the root item => remove all opened categories
            if (professionCategoriesOpened[0] === professionId) {
                setProfessionCategoriesOpened([])
            } else {
                setProfessionCategoriesOpened((previousArray) =>
                    previousArray.filter((item: string) => item !== professionId)
                )
            }
        }
    }

    const getChildProfessionsCount = (professionId: string): number => {
        if (professions === undefined || professionId.startsWith('X')) {
            return 0
        }

        const count: number = professions.filter((profession: Profession) => {
            return profession.koodi.length === professionId.length + 1 && profession.koodi.startsWith(professionId)
        }).length

        return count
    }

    const renderProfessionList = (profession: Profession[]): React.ReactNode => {
        if (professions === undefined) {
            return null
        }

        let professionsToRenderWithCheckbox: Profession[] = []
        const parentProfessions: Profession[] = []

        if (professionCategoriesOpened.length > 0) {
            const currentParentProfessions: Profession[] = []

            for (let i = 0; i < professionCategoriesOpened.length; i++) {
                const id: string = professionCategoriesOpened[i]
                const profession: Profession | undefined = professions.find(
                    (profession: Profession) => profession.koodi === id
                )

                if (profession === undefined) {
                    console.error(`[renderProfessionList]: could not find a profession with the id: ${id}`)
                    continue
                }

                currentParentProfessions.push(profession)
            }

            parentProfessions.push(...currentParentProfessions)

            const checkboxListRootProfession: Profession | undefined = professions.find(
                (profession: Profession) => profession.koodi === parentProfessions[parentProfessions.length - 1].koodi
            )
            if (checkboxListRootProfession === undefined) {
                console.error(
                    `[renderProfessionList]: could not find a profession with id: ${
                        parentProfessions[parentProfessions.length - 1].koodi
                    }`
                )

                return null
            }

            professionsToRenderWithCheckbox = profession.filter(
                (profession: Profession) =>
                    profession.koodi.length === checkboxListRootProfession.koodi.length + 1 &&
                    profession.koodi.startsWith(checkboxListRootProfession.koodi)
            )
        } else {
            professionsToRenderWithCheckbox = professions.filter(
                (profession: Profession) =>
                    (profession.koodi.length === 1 && parseInt(profession.koodi)) || profession.koodi === 'X0'
            ) // X0 = 'Företagare'
        }

        return (
            <>
                {parentProfessions.length === 0 ? (
                    <div className="my-4 text-gray-600 text-lg leading-relaxed">
                        {professionsToRenderWithCheckbox.map((profession: Profession, index: number) => {
                            return renderCheckbox(profession, index)
                        })}
                    </div>
                ) : (
                    <>
                        {parentProfessions.map((parentProfession: Profession, parentIndex: number) => (
                            <div
                                className={`${margins[parentIndex]} my-2 text-gray-600 text-lg leading-relaxed`}
                                key={parentIndex}
                            >
                                {renderCheckbox(parentProfession, parentIndex)}
                            </div>
                        ))}
                        <div
                            className={`${
                                margins[parentProfessions.length]
                            } my-2 text-gray-600 text-lg leading-relaxed`}
                        >
                            {professionsToRenderWithCheckbox.map((profession: Profession, index: number) => {
                                return renderCheckbox(profession, index)
                            })}
                        </div>
                    </>
                )}
            </>
        )
    }

    const renderCheckbox = (profession: Profession, index: number): React.ReactNode => {
        const hasSelectedChildProfessions: boolean =
            professionsChecked.filter((id: string) => id.startsWith(profession.koodi) && id !== profession.koodi)
                .length > 0
                ? true
                : false

        const permissionHasCheckedParent =
            professionsChecked.filter((id: string) => profession.koodi.startsWith(id)).length > 0 ? true : false

        return (
            <div
                key={index}
                className={`${
                    getChildProfessionsCount(profession.koodi) > 0
                        ? 'cursor-pointer hover:bg-gray-100 active:bg-red-300 rounded-md'
                        : 'cursor-default'
                } flex pl-2 w-full text-left pt-2 pb-2 md:pb-1 md:pt-1 focus:ring-3 focus:ring-pink-500 focus:ring-opacity-50`}
                onClick={(event) => openProfessionCategory(event, profession.koodi)}
            >
                <input
                    aria-label={profession.kuvaus}
                    type="checkbox"
                    className={`cursor-pointer form-checkbox rounded-sm md:rounded-md h-4 w-4 md:h-6 md:w-6 text-pink-500 border-gray-700 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50`}
                    checked={permissionHasCheckedParent}
                    value={profession.koodi}
                    onClick={(event) => event.stopPropagation()}
                    onChange={(event) => {
                        onToggleCheckbox(event)
                    }}
                />
                <span
                    className={`${
                        hasSelectedChildProfessions ? 'font-bold' : ''
                    } leading-2 md:leading-6 truncate ml-3 font-sans text-xs md:text-sm overflow-ellipsis text-gray-800 ${
                        getChildProfessionsCount(profession.koodi) > 0 ? 'cursor-pointer' : ''
                    }`}
                >
                    {profession.kuvaus}
                </span>
            </div>
        )
    }

    return (
        <>
            {showFilterDilaog ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-20 outline-none focus:outline-none">
                        <div className="relative w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/3 my-6 mx-auto max-h-full max-w-3xl overflow-y-auto">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full h-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-3 md:p-6 border-b border-solid border-gray-300 rounded-t">
                                    <h3 className="font-sans text-xl font-semibold">{t('filter_dialog_title')}</h3>
                                    <button
                                        disabled={professionsChecked.length <= 0 ? true : false}
                                        className={`${
                                            professionsChecked.length <= 0
                                                ? 'opacity-50 cursor-default'
                                                : 'hover:bg-blue-700'
                                        } bg-blue-500 text-white font-bold rounded-lg uppercase px-4 py-2 text-xs outline-none focus:outline-none`}
                                        type="button"
                                        onClick={() => {
                                            dispatch(jobSearchActions.ClearProfessionsChecked())
                                            setProfessionCategoriesOpened([])
                                        }}
                                    >
                                        {t('filter_dialog_reset_filters')}
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-3 md:p-6 flex-auto overflow-y-auto">
                                    <div className="block">
                                        <span className="font-bold text-gray-700">
                                            {t('filter_dialog_profession_groups')}
                                        </span>
                                        {professions !== undefined && (
                                            <div className="mt-2">{renderProfessionList(professions)}</div>
                                        )}
                                    </div>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                                    <button
                                        className="text-white bg-pink-500 font-bold rounded-lg uppercase px-6 py-2 text-sm outline-none focus:outline-none ml-2 mr-1 mb-1 hover:bg-pink-700 hover:text-white"
                                        type="button"
                                        onClick={() => setShowDialog(false)}
                                    >
                                        {t('filter_dialog_close')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="opacity-25 fixed inset-0 z-10 bg-black"
                        onClick={() => {
                            setShowDialog(false)
                            alert('woop')
                        }}
                    ></div>
                </>
            ) : null}
        </>
    )
}
