import { Locations } from '../entities/locations'
import { Language } from '../enums/language'
import programmerare_vasa_sv from '../resources/programmerare_vasa_sv.json'
import single_job from '../resources/single_job.json'
import locations from '../resources/locations.json'

export class TEApi {
    searchJob = async (language: Language, query: string, location: string): Promise<any> => {
        try {
            if (process.env.REACT_APP_USE_LIVE_DATA_API === 'true') {
                const res = await fetch(
                    `https://paikat.te-palvelut.fi/tpt-api/tyopaikat?kieli=${language}&hakusana=${query}&alueet=${location}`
                )
                return res.json()
            } else {
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
                return locations
            }
        } catch (error) {
            console.error(error)
        }
    }
}
