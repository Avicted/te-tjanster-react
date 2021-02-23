import { Locations } from '../entities/locations'
import { Language } from '../enums/language'
import programmerare_vasa_sv from '../resources/programmerare_vasa_sv.json'
import single_job from '../resources/single_job.json'
import locations from '../resources/locations.json'
import professions from '../resources/professions.json'
import { capitalizeFirstCharacterInString } from '../shared/utilities'
import { JOBS_PER_SEARCH_QUERY } from '../constants'
import { ApiResponse } from '../entities/apiResponse'

export class TEApi {
    searchJob = async (
        language: Language,
        query: string,
        location: string,
        start: number,
        append?: boolean,
        professionsChecked?: string[]
    ): Promise<any> => {
        try {
            if (process.env.REACT_APP_USE_LIVE_DATA_API === 'true') {
                location = capitalizeFirstCharacterInString(location)
                let uri: string = ''

                // Construct URI filter parameters
                let professionsQueryParams: string = ''
                if (professionsChecked !== undefined) {
                    professionsChecked.forEach((id) => {
                        professionsQueryParams += encodeURI(`&valitutAmmattialat=${id}`)
                    })
                }

                if (
                    location === '' &&
                    query === '' &&
                    (professionsChecked === undefined || professionsChecked.length <= 0)
                ) {
                    uri = `https://paikat.te-palvelut.fi/tpt-api/tyopaikat?kieli=${language}&valitutAmmattialat=X0&valitutAmmattialat=0&valitutAmmattialat=9&valitutAmmattialat=8&valitutAmmattialat=7&valitutAmmattialat=6&valitutAmmattialat=5&valitutAmmattialat=4&valitutAmmattialat=3&valitutAmmattialat=2&valitutAmmattialat=1&rows=${JOBS_PER_SEARCH_QUERY}&start=${start}`
                } else {
                    // Get specific jobs
                    uri = `https://paikat.te-palvelut.fi/tpt-api/tyopaikat?kieli=${language}&hakusana=${query}&alueet=${location}&rows=${JOBS_PER_SEARCH_QUERY}${
                        start === undefined ? '' : `&start=${start}`
                    }${professionsQueryParams.length > 0 ? professionsQueryParams : ''}`
                }
                const res = await fetch(uri)
                return res.json()
            } else {
                console.error(
                    'REACT_APP_USE_LIVE_DATA_API = false has not been validated nor tried with the new logic!'
                )
                return programmerare_vasa_sv
            }
        } catch (error) {
            console.error(error)
            return undefined
        }
    }

    getJobDetails = async (jobId: string, language: Language): Promise<any> => {
        try {
            if (process.env.REACT_APP_USE_LIVE_DATA_API === 'true') {
                const res = await fetch(`https://paikat.te-palvelut.fi/tpt-api/tyopaikat/${jobId}?kieli=${language}`)
                return res.json()
            } else {
                console.error(
                    'REACT_APP_USE_LIVE_DATA_API = false has not been validated nor tried with the new logic!'
                )
                return single_job
            }
        } catch (error) {
            console.error(error)
        }
    }

    getLocations = async (language: Language): Promise<Locations | undefined> => {
        try {
            if (process.env.REACT_APP_USE_LIVE_DATA_API === 'true') {
                const res = await fetch(`https://paikat.te-palvelut.fi/tpt-api/koodistot/sijainti?kieli=${language}`)
                return res.json()
            } else {
                console.error(
                    'REACT_APP_USE_LIVE_DATA_API = false has not been validated nor tried with the new logic!'
                )
                return locations
            }
        } catch (error) {
            console.error(error)
        }
    }

    getProfessions = async (language: Language): Promise<ApiResponse | undefined> => {
        try {
            if (process.env.REACT_APP_USE_LIVE_DATA_API === 'true') {
                const res = await fetch(`https://paikat.te-palvelut.fi/tpt-api/koodistot/ammattiala?kieli=${language}`)
                return res.json()
            } else {
                return professions
            }
        } catch (error) {
            console.error(error)
        }
    }
}
