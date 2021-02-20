import { Job } from './Job'
import { JobDetails } from './jobDetails'

export interface ApiResponse {
    response?: {
        docs: Job[] | JobDetails[]
        numFound?: number
    }
}
