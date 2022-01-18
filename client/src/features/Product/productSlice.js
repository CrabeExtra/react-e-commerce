
export const loadItem= (data) => {
    return {
        type: 'product/loadItem',
        payload: data
    };
}

const initialProduct = [];
export const productReducer = (product = initialProduct, action) => {
    switch(action.type) {
        case 'product/loadItem': {
            return action.payload;
        }
        default: {
            return product;
        }
    }
}