const initialState = {
  data: [
    {
      id: "1",
      text: "Input 1"
    },
    {
      id: "2",
      text: "Input 2"
    },
  ]
}

export default function inputs(state = initialState, action){
  switch (action.type){
    case "ADD_INPUT" :
      return { ...state, data: [ ...state.data, action.title] }
    default:
      return state;
  }
}