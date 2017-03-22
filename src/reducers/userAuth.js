const reducer = (
                state = {
                    isLoggedIn : false,
                    messages : [],
                    requestForRegister : false
                },
                action) => {

            switch (action.type) {
                case 'REQUEST_REGISTRATION':
                    return{
                        ...state,
                        requestForRegister :true
                    }
                    break;
                case 'SUCCESS_REGISTRATION':
                    return {
                        ...state,
                        requestForRegister : false,
                        messages : [...state.messages,
                                    'Successfully Registered'
                                    ]
                    }
                    break;
                case 'FAILURE_REGISTRATION':
                    return {
                        ...state,
                        requestForRegister : false,
                        messages : [...state.messages,
                                    'Failed To Registered'
                                    ]
                    }
                    break;
                default:

            }
}
