import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input
} from 'reactstrap';
import { createFile, createFolder } from '../store/fileManagerSlice';
import { useDispatch } from 'react-redux';

function FileModal({ isOpen, toggle }) {
    const { modalAction, currentPath } = useSelector((state) => state.fileManager)
    const dispatch = useDispatch()

    const ref = useRef()
    const [file, setFile] = useState(null)
    const [folderPath, setFolderPath] = useState('')

    const resetModal = () => {
        setFile({})
        toggle()
    }

    const saveHandler = () => {
        if (modalAction === "book") {
            if (currentPath === '') {
                console.log('No Seleted folder!')
                return
            }
            let formData = new FormData()
            formData.append('folder', currentPath.replace(/\s?>\s/gim, "/"))
            formData.append('file', file)
            dispatch(createFile(formData))
            resetModal()
        } else {
            dispatch(createFolder(`${currentPath.replace(/\s?>\s/gim, "/")}/${folderPath}`))
            resetModal()
        }
    }
    return (
        <div>
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>Add {modalAction}</ModalHeader>
                <ModalBody>
                    {modalAction === 'location' ? (
                        <Input
                            ref={ref}
                            placeholder='Enter Folder Path'
                            onChange={(e) => {
                                setFolderPath(e.target.value)
                            }}
                        />
                    ) : (
                        <Input
                            id="exampleFile"
                            name="file"
                            type="file"
                            onChange={(e) => {
                                // console.log(e.target.files[0])
                                setFile(e.target.files[0])
                            }}
                        />
                    )}


                </ModalBody>
                <ModalFooter>
                    <Button onClick={saveHandler} color="primary">Save</Button>
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default FileModal;