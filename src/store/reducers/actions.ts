import { valueToPercent } from "@mui/base";

interface Action {
    type: string,
    value: boolean
}

const initialState = {
    execution: false
}
  
export default function actions(state = initialState, action: Action){
switch (action.type){
    case "SET_EXECUTION" :
        return { execution: action.value }
    default:
        return state;
}
}