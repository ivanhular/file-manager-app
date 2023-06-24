// import { readdir } from 'node:fs/promises'
const { readdir } = require('fs').promises
const { join } = require('path')
require('dotenv').config()

const basePath = process.cwd()
const fileMainFolder = process.env.FILE_FOLDER

const walk = async (dirPath) => Promise.all(
    await readdir(dirPath, { withFileTypes: true })
        .then((entries) => entries.map(async (entry) => {
            console.log(dirPath, 'dirPath')
            const childPath = join(dirPath, entry.name)
            let outputPath = childPath.replace(join(basePath, fileMainFolder), '')
            outputPath = outputPath.replace(/\\/gm, '/')
            console.log(childPath, 'childPath')
            if (entry.isDirectory()) {

                return {
                    name: entry.name,
                    isDirectory: true,
                    path: outputPath ,
                    files: await walk(childPath)
                }
            } else {
                return {
                    name: entry.name,
                    isDirectory: false,
                    path: outputPath,
                }
            }
        }))
)

module.exports = walk