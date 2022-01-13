export const setLogin = (data) => {
    return {
        type: 'login/setLogin',
        payload: data
    };
}

const initialLogin = '';
export const loginReducer = (login = initialLogin, action) => {
    switch(action.type) {
        case 'login/setLogin': {
            return action.payload;
        }
        default: {
            return login;
        }
    }
}