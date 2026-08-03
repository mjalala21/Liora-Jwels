import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user: null,
    // loading : true
}

const userSlice = createSlice({
    name : "user" , 
    initialState,

    reducers : {
        setUser(state, action){
            state.user = action.payload
        },

        clearUser(state){
            state.user = null
            
        },
//         setUserLoaded(state){
//             state.loading = false;
// }

        
    }
})

export const{setUser, clearUser, setUserLoaded} = userSlice.actions;
export default userSlice.reducer;