import { Job } from './Job'
import { JobDetails } from './jobDetails'
import { Profession } from './profession'

export interface ApiResponse {
    response?: {
        docs: Job[] | JobDetails[] | Profession[]
        numFound?: number
    }
}
