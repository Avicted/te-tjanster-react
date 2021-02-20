import { Locations } from '../entities/locations'
import { Language } from '../enums/language'
import programmerare_vasa_sv from '../resources/programmerare_vasa_sv.json'
import single_job from '../resources/single_job.json'
import locations from '../resources/locations.json'
import { capitalizeFirstCharacterInString } from '../shared/utilities'

export class TEApi {
    private rows: string = '10'
    searchJob = async (
        language: Language,
        query: string,
        location: string,
        start: number,
        append?: boolean
    ): Promise<any> => {
        try {
            if (process.env.REACT_APP_USE_LIVE_DATA_API === 'true') {
                location = capitalizeFirstCharacterInString(location)
                let uri: string = ''

                if (location === '' && start === 0) {
                    // Get all the jobs!
                    // @TODO: magic number + 10, this should be a global constant somewhere over the rainbow
                    start = append === true ? start + 10 : start
                    uri = `https://paikat.te-palvelut.fi/tpt-api/tyopaikat?kieli=${language}&valitutAmmattialat=X0&valitutAmmattialat=0&valitutAmmattialat=9&valitutAmmattialat=8&valitutAmmattialat=7&valitutAmmattialat=6&valitutAmmattialat=5&valitutAmmattialat=4&valitutAmmattialat=3&valitutAmmattialat=2&valitutAmmattialat=1&rows=${this.rows}&start=${start}`
                } else {
                    // Get specific jobs
                    uri = `https://paikat.te-palvelut.fi/tpt-api/tyopaikat?kieli=${language}&hakusana=${query}&alueet=${location}&rows=${
                        this.rows
                    }${start === undefined ? '' : `&start=${start}`}`
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
}
