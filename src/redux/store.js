import {configureStore} from '@reduxjs/toolkit'
import todoReducer from "./slice/family"

export const store = configureStore({
    reducer : {
        todo : todoReducer,
    }
})
