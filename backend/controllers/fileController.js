const fs = require('fs-extra')
const path = require('path')
const asyncHandler = require('express-async-handler')
const walk = require('../utils/readFiles')
require('dotenv').config()

const basePath = process.cwd()
const fileMainFolder = process.env.FILE_FOLDER

const setPath = (bPath, mainPath, fPath = '') => path.join(bPath, mainPath, fPath)

const uploadFile = asyncHandler((req, res) => {
    // console.log(req.file)
    res.send({ file: req.file, created: true })
})

const deleteFile = asyncHandler(async (req, res) => {
    console.log(req.body)
    const { filePath } = req.body
    await fs.remove(setPath(basePath, fileMainFolder, filePath))
    res.send({ filePath, remove: true })
})

const moveFile = asyncHandler(async (req, res) => {
    console.log(req.body)
    const { filePath, toPath } = req.body

    // console.log(setPath(process.cwd(), `/files/${filePath}`))
    await fs.move(setPath(basePath, fileMainFolder, filePath),
        setPath(basePath, fileMainFolder, toPath))

    res.send({ filePath, toPath, move: true })
})

const createFolder = asyncHandler(async (req, res) => {
    const { folderPath } = req.body
    await fs.ensureDir(setPath(basePath, fileMainFolder, folderPath))
    res.send({ folderPath, folderCreated: true })
})

const getFiles = asyncHandler(async (req, res) => {
    const file = await walk(`${basePath}/${fileMainFolder}`)
    res.send({ file })
})

module.exports = {
    uploadFile,
    deleteFile,
    moveFile,
    createFolder,
    getFiles
}