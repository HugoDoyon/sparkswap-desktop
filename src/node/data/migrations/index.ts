import { join as pathJoin } from 'path'
import { readdirSync } from 'fs'

const migrationFilePaths = [
  pathJoin(__dirname, '0001-create-trades-table.sql'),
  pathJoin(__dirname, '0002-create-events-table.sql'),
  pathJoin(__dirname, '0003-create-recurring-buys-table.sql'),
  pathJoin(__dirname, '0004-add-quote-expiration.sql')
]

const version = migrationFilePaths.length

const currentFileNames = [
  __filename,
  `${__filename}.map`
]

const dirFiles = readdirSync(__dirname)
dirFiles.forEach((dirFilename) => {
  if (!migrationFilePaths.concat(currentFileNames).includes(pathJoin(__dirname, dirFilename))) {
    throw new Error(`Unknown migration in directory: ${dirFilename}`)
  }
})

export { migrationFilePaths, version }
