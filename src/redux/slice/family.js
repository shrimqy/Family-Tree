import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import newRequest from '../../utils/newRequest';

export const fetchFamilyMembers = createAsyncThunk('fetchFamilyMembers', async () => {
    const response = await newRequest.get("/family/all");
    console.log(response)
    return response.data;
})

const familySlice = createSlice({
    name : 'todo',
    initialState : {
        isLoading : false,
        data : null,
        isError : false
    },
    extraReducers : (builder) => {

        builder.addCase(fetchFamilyMembers.pending, (state,action) => {
            state.isLoading = true;

        })

        builder.addCase(fetchFamilyMembers.fulfilled, (state,action) => {
            state.isLoading = false;
            state.data = action.payload;
        });

        builder.addCase(fetchFamilyMembers.rejected, (state,action) => {
            console.log('Error', action.payload)
            state.isError = true;
        })
    }
});

export default familySlice.reducer;