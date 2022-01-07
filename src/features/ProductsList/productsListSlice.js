
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

const initialPostList = [];
export const postListReducer = (postList = initialPostList, action) => {
    switch(action.type) {
        case 'productsList/loadData': {
            return action.payload;
        }
        case 'productsList/loadMore': {
            return [...postList, action.payload];
        }
        default: {
            return postList;
        }
    }
}