import React, { useEffect, useState } from 'react'
import {
    Card,
    CardBody
} from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getFiles } from '../store/fileManagerSlice'
import LocationInput from './locationInput'
import { FileItem } from './FileItem'
import FileModal from './FileModal'
// const data = [
//     {
//         "name": "test",
//         "isDirectory": true,
//         "path": "\\test",
//         "files": [
//             {
//                 "name": "bookshelf",
//                 "isDirectory": true,
//                 "path": "\\test\\bookshelf",
//                 "files": [
//                     {
//                         "name": "5691a1352a383b951b4da897e25fe2d5",
//                         "isDirectory": false,
//                         "path": "\\test\\bookshelf\\5691a1352a383b951b4da897e25fe2d5"
//                     },
//                     {
//                         "name": "otherFolder",
//                         "isDirectory": true,
//                         "path": "\\test\\bookshelf\\otherFolder",
//                         "files": [
//                             {
//                                 "name": "0c5130b5ccef4eddf50c452b7f8d4075.txt",
//                                 "isDirectory": false,
//                                 "path": "\\test\\bookshelf\\otherFolder\\0c5130b5ccef4eddf50c452b7f8d4075.txt"
//                             },
//                             {
//                                 "name": "deepFolder",
//                                 "isDirectory": true,
//                                 "path": "\\test\\bookshelf\\otherFolder\\deepFolder",
//                                 "files": [
//                                     {
//                                         "name": "superDeepFolder",
//                                         "isDirectory": true,
//                                         "path": "\\test\\bookshelf\\otherFolder\\deepFolder\\superDeepFolder",
//                                         "files": [
//                                             {
//                                                 "name": "super.txt",
//                                                 "isDirectory": false,
//                                                 "path": "\\test\\bookshelf\\otherFolder\\deepFolder\\superDeepFolder\\super.txt"
//                                             }
//                                         ]
//                                     },
//                                     {
//                                         "name": "txt.txt",
//                                         "isDirectory": false,
//                                         "path": "\\test\\bookshelf\\otherFolder\\deepFolder\\txt.txt"
//                                     }
//                                 ]
//                             }
//                         ]
//                     }
//                 ]
//             }
//         ]
//     },
//     {
//         "name": "test2",
//         "isDirectory": true,
//         "path": "\\test2",
//         "files": [
//             {
//                 "name": "anotherFolders",
//                 "isDirectory": true,
//                 "path": "\\test2\\anotherFolders",
//                 "files": [
//                     {
//                         "name": "test",
//                         "isDirectory": true,
//                         "path": "\\test2\\anotherFolders\\test",
//                         "files": []
//                     }
//                 ]
//             }
//         ]
//     }
// ]

const FileManagerList = () => {
    const { data, success } = useSelector((state) => state.fileManager)
    const dispatch = useDispatch()

    const [modal, setModal] = useState(false);

    const toggle = () => {
        setModal(!modal)
        console.log(modal,'state')
    }

    useEffect(() => {
        console.log('getFiles')
        dispatch(getFiles())
    }, [success])

    return <>
        <LocationInput toggle={toggle} />
        <Card style={{ marginTop: '20px' }}>
            <CardBody>
                <FileItem data={data}></FileItem>
            </CardBody>
        </Card>
        <FileModal isOpen={modal} toggle={toggle} />
    </>

}

export default FileManagerList