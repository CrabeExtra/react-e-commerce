
export const loadData = (data) => {
    return {
        type: 'productsList/loadData',
        payload: data
    };
}

export const loadMore = (data) => {
    return {
        type: 'productsList/loadMore',
        payload: data
    };
}

const initialProductsList = [];
export const productsListReducer = (productsList = initialProductsList, action) => {
    switch(action.type) {
        case 'productsList/loadData': {
            return action.payload;
        }
        case 'productsList/loadMore': {
            return [...productsList, action.payload];
        }
        default: {
            return productsList;
        }
    }
}