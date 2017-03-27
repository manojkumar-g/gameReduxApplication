
const reducer = (
                state = {
                  isLoggedIn: false,
                  messages: [],
                  requestForRegister: false,
                  requestForLogin: true,
                  firstName: '',
                },
                action) => {
  switch (action.type) {
    case 'REQUEST_REGISTRATION':
      return {
        ...state,
        requestForRegister: true }
    case 'REQUEST_LOGIN':
      return {
        ...state,
        requestForLogin: true }
    case 'SUCCESS_REGISTRATION':
      return {
        ...state,
        requestForRegister: false,
        messages: [...state.messages,
          action.message] }
    case 'SUCCESS_LOGIN':
      return {
        ...state,
        requestForRegister: false,
        messages: [...state.messages,
                    { key: action.key, data: action.message }],
        isLoggedIn: true,
        firstName: action.name }
    case 'FAILURE_REGISTRATION':
      return {
        ...state,
        requestForRegister: false,
        messages: [...state.messages,
                    { key: action.key, data: action.message }] }
    case 'FAILURE_LOGIN':
      return {
        ...state,
        requestForLogin: false,
        messages: [...state.messages,
                    { key: action.key, data: action.message }] }
    case 'REQUEST_LOGOUT':
      return {
        ...state,
        isLoggedIn: false }
    default:
      return state
  }
}

export default reducer
