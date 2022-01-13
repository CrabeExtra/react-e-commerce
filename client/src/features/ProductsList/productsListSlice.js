
export const loadData = (data) => {
    return {
        type: 'productsList/loadData',
        payload: data
    };
}

const initialProductsList = [];
export const productsListReducer = (productsList = initialProductsList, action) => {
    switch(action.type) {
        case 'productsList/loadData': {
            return action.payload;
        }
        default: {
            return productsList;
        }
    }
}