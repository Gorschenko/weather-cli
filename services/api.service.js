import axios from 'axios'
// import https from 'https'
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js'

const getWeather = async city => {
    // return new Promise(async (resolve, reject) => {
    //     const token = await getKeyValue(TOKEN_DICTIONARY.token)
    //     if (!token) {
    //         throw new Error('Не задан API key')
    //     }
    //     // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
    //     const url = new URL('https://api.openweathermap.org/data/2.5/weather')
    //     url.searchParams.append('q', city)
    //     url.searchParams.append('appid', token)
    //     url.searchParams.append('lang', 'ru')
    //     url.searchParams.append('units', 'metric')

    //     https.get(url, response => {
    //         let res = ''
    //         response.on('data', chunk => {
    //             res += chunk
    //         })
    //         response.on('end', () => {
    //             resolve(res)
    //             // console.log(res)
    //         })
    //         response.on('error', error => {
    //             reject(error)
    //             // console.log(error)
    //         })
    //     })
    // })
    const token = await getKeyValue(TOKEN_DICTIONARY.token)
    if (!token) {
        throw new Error('Не задан API key')
    }
    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: city,
            appid: token,
            lang: 'ru',
            units: 'metric',
        }
    })
    return data
}

export { getWeather }