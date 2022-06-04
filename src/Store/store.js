import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import fieldReducer from './ToolkitSlicer/fieldSlice';

const store = configureStore({
    reducer: {
        field: fieldReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(createLogger())
})

export default store;