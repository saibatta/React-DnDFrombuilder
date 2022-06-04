import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    allFields: [],
    droppedField: {},
    editField: {},
    formData: [],
}
const fieldSlice = createSlice({
    name: 'fields',
    initialState,
    reducers: {
        getAllFields: (state, action) => {
            state.allFields = [
                ...state.allFields, ...action.payload]
        },
        getDroppedField: (state, action) => {
            state.droppedField = action.payload
        },
        getEditField: (state, action) => {
            state.editField = action.payload
        },
        deleteField: (state, action) => {
            state.allFields = state.allFields.filter((field) => { return field.id !== action.payload });
        },
        copyField: (state, action) => {
            state.allFields = [
                ...state.allFields, action.payload]
        },
        updateFormData: (state, action) => {
            let stateFormData = JSON.parse(JSON.stringify(state.formData));
            let indexId = stateFormData?.length && stateFormData.findIndex(item => item.id === action.payload.id);
            if (stateFormData?.length === 0) {
                stateFormData = [action.payload]
            }
            else if (indexId !== -1) {
                stateFormData[indexId] = action.payload;
            } else {
                let newFordData = action.payload;
                stateFormData.push({ ...newFordData })
            }
            state.formData = stateFormData;
        }

    }
})

export default fieldSlice.reducer;
export const { getAllFields, getDroppedField, getEditField, deleteField, copyField, updateFormData } = fieldSlice.actions;