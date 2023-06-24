import { createSlice, createAction } from '@reduxjs/toolkit'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080/';

const initialState = {
    currentPath: '',
    success: false,
    result: {},
    data: [],
    modalAction: ''
}

export const fileManagerSlice = createSlice({
    name: 'fileManager',
    initialState,
    reducers: {
        setCurrentPath: (state, action) => {
            state.currentPath = action.payload
        },
        getSuccess: (state, action) => {
            state.success = true
            state.data = action.payload
        },
        moveSuccess: (state, action) => {
            state.success = true
            state.result = action.payload
        },
        deleteSuccess: (state, action) => {
            state.success = true
            state.result = action.payload
        },
        createSuccess: (state, action) => {
            state.success = true
            state.result = action.payload
        },
        createFolderSuccess: (state, action) => {
            state.success = true
            state.result = action.payload
        },
        setModalAction: (state, action) => {
            state.modalAction = action.payload
        },
        resetState: (state) => {
            state.success = false
        }
    },
})

// Action creators are generated for each case reducer function
export const {
    setCurrentPath,
    getSuccess, moveSuccess,
    deleteSuccess,
    createSuccess,
    createFolderSuccess,
    resetState,
    setModalAction
} = fileManagerSlice.actions

export const moveFile = (filePath, movePath) => async dispatch => {
    const data = {
        filePath: filePath,
        toPath: `${movePath}/${filePath.substring(filePath.lastIndexOf('/') + 1)}`
    }
    console.log(data)
    const { data: result } = await axios.put('/file', data)
    dispatch(moveSuccess(result))
}

export const deleteFile = (filePath) => async dispatch => {
    const data = { filePath }
    const { data: result } = await axios.delete('/file', {
        data
    })
    dispatch(deleteSuccess(result))
}

export const createFile = (formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }
    const { data } = await axios.post('/file', formData, config)
    dispatch(createSuccess(data))
}

export const createFolder = (folderPath) => async dispatch => {
    const data = { folderPath }
    const { data: result } = await axios.post('/file/folder', data)
    dispatch(createFolderSuccess(result))
}

export const getFiles = () => async dispatch => {

    const { data } = await axios.get('/file')
    dispatch(getSuccess(data.file))
    dispatch(resetState())
}

export default fileManagerSlice.reducer