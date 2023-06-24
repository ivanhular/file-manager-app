import { configureStore } from '@reduxjs/toolkit'
import fileManagerReducer from './fileManagerSlice'

export const store = configureStore({
    reducer: {
        fileManager: fileManagerReducer
    },
})

