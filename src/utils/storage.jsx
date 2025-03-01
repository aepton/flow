import { setInitialStateForRound } from "../slices/flowSlice";

export function updateLocalStorage(flow) {
    localStorage.setItem("flow", JSON.stringify(flow));
}

export function loadLocalStorage(dispatch) {
    dispatch(setInitialStateForRound(JSON.parse(localStorage.getItem("flow"))));
}
