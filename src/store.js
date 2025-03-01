import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import flowReducer from "./slices/flowSlice";
import { updateLocalStorage } from "./utils/storage";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    predicate: () => true,
    effect: (action, listenerApi) => {
        updateLocalStorage(listenerApi.getState().flow);
    },
});

export default configureStore({
    reducer: {
        flow: flowReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});
