interface Action {
  type: string,
  items: []
}  

const initialState = {
  data: []
}

export default function inputs(state = initialState, action: Action){
  switch (action.type){
    case "ADD_INPUT" :
      return { ...state.data, data: [ ...state.data, action.items] }
    default:
      return state;
  }
}