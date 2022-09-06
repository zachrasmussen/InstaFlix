import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { ottApi } from "./AxiosService.js"


class ContentService {
        async getContent() {
                const res = await ottApi.get('')
                logger.log('Getting movies', res.data)
                AppState.contents = res.data.results
        }
}





export const contentService = new ContentService()