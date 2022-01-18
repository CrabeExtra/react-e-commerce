export const loadCart = (data) => {
    return {
        type: 'cart/loadCart',
        payload: data
    };
}

const initialCart = '';
export const cartReducer = (cart = initialCart, action) => {
    switch(action.type) {
        case 'cart/loadCart': {
            return action.payload;
        }
        default: {
            return cart;
        }
    }
}