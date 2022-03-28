const initialState = {
  data: [
    {
      id: "1",
      text: "Suggestion 1"
    },
    {
      id: "2",
      text: "Suggestion 2"
    },
  ]
}

export default function suggestions(state = initialState, action){
  switch (action.type){
    case "ADD_SUGGESTION" :
      return { ...state, data: [ ...state.data, action.title] }
    default:
      return state;
  }
}