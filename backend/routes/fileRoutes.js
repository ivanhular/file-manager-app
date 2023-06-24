const express = require('express')
const upload = require('../middleware/uploadMiddleware')
const {
    uploadFile,
    deleteFile,
    moveFile,
    createFolder,
    getFiles
} = require('../controllers/fileController')

const router = express.Router()

router.route('/')
    .get(getFiles)
    .post(upload.single('file'), uploadFile)
    .delete(deleteFile)
    .put(moveFile)

router.route('/folder').post(createFolder)


module.exports = router