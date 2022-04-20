import { combineReducers } from 'redux'
import inputs from './inputs'
import suggestions from './suggestions'
import actions from './actions'

export default combineReducers({
    inputs,
    suggestions,
    actions
})