import {configureStore} from '@reduxjs/toolkit'
import searchReducer from '../slices/SearchSlice'
import userReducer from '../slices/UserSlice'

export const store = configureStore({
    reducer : {
       search : searchReducer,
       user : userReducer
    }
})