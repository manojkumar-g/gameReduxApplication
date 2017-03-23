
const reducer = (
                state = {
                    isLoggedIn : false,
                    messages : [],
                    requestForRegister : false,
                    requestForLogin : true,
                    firstName : '',

                },
                action
              ) => {

            switch (action.type) {
                case 'REQUEST_REGISTRATION':
                    return{
                        ...state,
                        requestForRegister :true
                    }
                    break;
                case 'REQUEST_LOGIN':
                    return{
                        ...state,
                        requestForLogin :true
                    }
                    break;
                case 'SUCCESS_REGISTRATION':
                    return {
                        ...state,
                        requestForRegister : false,
                        messages : [...state.messages,
                                    action.message
                                    ]
                    }
                    break;
                case 'SUCCESS_LOGIN':
                    return {
                        ...state,
                        requestForRegister : false,
                        messages : [...state.messages,
                                    {key: action.key , data : action.message}
                                  ],
                        isLoggedIn : true,
                        firstName : action.name
                    }
                    break;
                case 'FAILURE_REGISTRATION':
                    return {
                        ...state,
                        requestForRegister : false,
                        messages : [...state.messages,
                                    {key: action.key , data : action.message}
                                    ]
                    }
                    break;
                  case 'FAILURE_LOGIN':
                      return {
                          ...state,
                          requestForLogin : false,
                          messages : [...state.messages,
                                      {key: action.key , data : action.message}
                                      ]
                      }
                      break;
                default:
                    return state;
            }
}

export default reducer;
