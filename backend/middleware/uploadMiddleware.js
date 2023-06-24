const multer = require('multer')
const path = require('path')
const fs = require('fs-extra')

const storage = multer.diskStorage({
    async destination(req, file, cb) {
        try {
            const mainFolder = 'files'
            console.log(req.body, 'middlewareUpload')
            const { folder } = req.body
            const dest = folder
                ? `${mainFolder}/${folder}`
                : `${mainFolder}/`

            if (folder) {
                await fs.ensureDir(dest)
            }
            cb(null, dest)
        } catch (error) {
            console.log(error)
        }
    },
    filename(req, file, cb) {
        cb(null, file.originalname)
    },
})

module.exports = multer({
    storage,
    // fileFilter: function (req, file, cb) {
    //     checkFileType(file, cb)
    // },
})

