interface Action {
  type: string,
  items: []
}  

const initialState = {
  data: [
    
  ]
}

export default function inputs(state = initialState, action: Action){
  switch (action.type){
    case "ADD_INPUT" :
      const result = { ...state.data, data: [ ...state.data, action.items] }
      console.log('result...', result)
      return result
    default:
      return state;
  }
}