import Axios from 'axios'
import { baseURL } from '../env'
export const api = Axios.create({
  baseURL,
  timeout: 8000
})

export const ottApi = Axios.create({
  baseURL: 'https://ott-details.p.rapidapi.com/advancedsearch',
  params: {
    start_year: '1970',
    end_year: '2020',
    min_imdb: '6',
    max_imdb: '10',
    // genre: 'comedy',
    language: 'english',
    type: 'movie',
    sort: 'latest',
    page: '1',
  },
  headers: {
    'X-RapidAPI-Key': '91e8b1a45cmsh48ba9db00bf0194p1718f6jsn684843c31d65',
    'X-RapidAPI-Host': 'ott-details.p.rapidapi.com'
  }
});
