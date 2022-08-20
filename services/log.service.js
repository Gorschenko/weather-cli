import chalk from 'chalk'


const printError = error => {
    console.log(chalk.bgRed('ERROR') + ' ' + error)
}

const printSuccess = message => {
    console.log(chalk.bgGreen('SUCCESS') + ' ' + message)
}

const printHelp = message => {
    console.log(`
      ${chalk.byCyan('HELP')}
      Без параметров - вывод погоды
      -s [CITY] для установки города
      -h для вывода помощи
      -t [API_KEY] для сохранения токена
    `)
}

export { printError, printSuccess, printHelp }
