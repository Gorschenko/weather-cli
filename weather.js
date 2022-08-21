#!/usr/bin/env node

// cat <НАЗВАНИЕ_ФАЙЛА> - читает файл
// rm <НАЗВАНИЕ_ФАЙЛА> - удаляет файл
// ls - показывает список файлов в директории
// $env:VARIABLE=VALUE - добавление перменных в env

import { getArgs } from './helpers/args.js'
import { getWeather, getIcon } from './services/api.service.js'
import { printHelp, printSuccess, printError, printWeather } from './services/log.service.js'
import { saveKeyValue, getKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js'

const saveToken = async token => {
    if (!token.length) {
        printError('Не передан токен')
        return
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token)
        printSuccess('Токен сохранен')
    } catch (e) {
        printError(e.message)
    }
}

const saveCity = async city => {
    if (!city.length) {
        printError('Не передан город')
        return
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city)
        printSuccess('Город сохранен')
    } catch (e) {
        printError(e.message)
    }
}

const getForcast = async () => {
    try {
        const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city)
        const weather = await getWeather(city)
        printWeather(weather, getIcon(weather.weather[0].icon))
    } catch(e) {
        if (e?.response?.status === 404) {
            printError('Неверно указан город')
        } else if (e?.response?.status === 401) {
            printError('Неверно указан токен')
        } else {
            printError(e.message)
        }
    }
}

const initCLI = async () => {
    const args = getArgs(process.argv)
    console.log('ARGS: ', args)
    if (args.h) {
        return printHelp()
    }
    if (args.s) {
        return saveCity(args.s)
    }
    if (args.t) {
        return saveToken(args.t)
    }
    return getForcast()
}

initCLI()
