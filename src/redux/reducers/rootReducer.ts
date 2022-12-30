import { combineReducers } from "redux";
import { currentListReducer } from "./currentListReducer";
import { listsReducer } from './listsReducer';


export const rootReducer = combineReducers({
    lists: listsReducer,  
    currentList: currentListReducer
})

export type RootState = ReturnType<typeof rootReducer>