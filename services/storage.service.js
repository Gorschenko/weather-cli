import { homedir } from 'os'
import { join } from 'path'
import { promises } from 'fs'


import {
    basename,
    dirname,
    extname,
    relative,
    isAbsolute,
    resolve,
    sep
} from 'path'

// join - работа при конкатенации строк
// basename - наименование последнего файла/папки в директории
// dirname - где находится последний файл в директории
// extname - показывается расширение файла в директории
// relative - показывает разница между двумя путями: to - from
// isAbsolute - возвращает true/false в зависимости от того
// является ли путь абсолютным (не имеет в пути точки - ..)
// resolve - показывает директорию относительно текущей,
// применяя указанные шаги, например, ..
// sep - показывает сепаратор


const filePath = join(homedir(), 'weather-data.json')

const TOKEN_DICTIONARY = {
    token: 'token',
    city: 'city'
}

const saveKeyValue = async (key, value) => {
    let data = {}
    if (await isExist(filePath)) {
        const file = await promises.readFile(filePath)
        data = JSON.parse(file)
    }
    data[key] = value
    await promises.writeFile(filePath, JSON.stringify(data))
}

 const getKeyValue = async key => {
    if (await isExist(filePath)) {
        const file = await promises.readFile(filePath)
        const data = JSON.parse(file)
        return data[key]
    }
    return undefined
 }

const isExist = async path => {
    try {
        await promises.stat(path)
        return true
    } catch (e) {
        return false
    }
}

export { saveKeyValue, getKeyValue, TOKEN_DICTIONARY }
