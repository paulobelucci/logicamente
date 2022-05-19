interface Action {
    type: string,
    value: boolean
}

const initialState = {
    execution: false,
    reiniciar: false,
    apagar: false
}
  
export default function actions(state = initialState, action: Action){
switch (action.type){
    case "SET_EXECUTION" :
        return { execution: action.value }
    case "SET_REINICIAR" :
        return { reiniciar: action.value }
    case "SET_APAGAR" :
        return { apagar: action.value }
    default:
        return state;
}
}