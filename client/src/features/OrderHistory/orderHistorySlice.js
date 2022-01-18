export const setOrders = (data) => {
    return {
        type: 'orders/setOrders',
        payload: data
    };
}

const initialOrders = [];
export const ordersReducer = (orders = initialOrders, action) => {
    switch(action.type) {
        case 'setOrders/setOrders': {
            return action.payload;
        }
        default: {
            return orders;
        }
    }
}